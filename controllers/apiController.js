require("dotenv").config()
const ReliefCampaign = require("../models/reliefCampaign")
const { initiateDeveloperControlledWalletsClient } = require('@circle-fin/developer-controlled-wallets');

const verifyProof = async (req, res) => {

    const proof = req.body.proof
    const action = req.body.action

    const reqBody = {...proof, action: action}

    console.log("###PRINTING PROOF")
    console.log(reqBody)

    const verifyRes = await fetch(`https://developer.worldcoin.org/api/v1/verify/${process.env.WORLDCOIN_APP_ID}`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify(reqBody),
    })

    // console.log(verifyRes)

    if (verifyRes.ok) {
        // This is where you should perform backend actions if the verification succeeds
        // Such as, setting a user as "verified" in a database
        res.status(verifyRes.status).send({
            code: "success",
            detail: "This action verified correctly!",
        });
    } else {

        console.log(verifyRes.code)
        console.log(verifyRes.detail)
        // This is where you should handle errors from the World ID /verify endpoint. 
        // Usually these errors are due to a user having already verified.
        res
        .status(verifyRes.status)
        .send({ code: verifyRes.code, detail: verifyRes.detail });
    }

}

const createReliefCampaign = async (req, res) => {

    const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
        apiKey: process.env.CIRCLE_API_KEY,
        entitySecret: process.env.ENTITY_SECRET // Make sure to enter the entity secret from the step above.
      });

      const response = await circleDeveloperSdk.createWallets({
        accountType: 'SCA',
        blockchains: ['MATIC-MUMBAI'],
        count: 1,
        walletSetId: process.env.WALLET_SET_ID
      });

      const walletInfo = response.data.wallets[0]


    const newReliefCampaign = new ReliefCampaign({
        campaignTitle: req.body.campaignTitle,
        campaignDescription: req.body.campaignDescription,
        allocatedFundAmount: req.body.allocatedFundAmount,
        fundDispensePerIndividual: req.body.fundDispensePerIndividual,
        fundingOrganization: req.body.fundingOrganization,
        fundingWalletAddress: walletInfo.address,
        walletId: walletInfo.id, 
        currentFundBalance: 0
    })
    await newReliefCampaign.save()
    res.status(200).send("Relief Campaign created successfully")
}

module.exports = {verifyProof, createReliefCampaign}