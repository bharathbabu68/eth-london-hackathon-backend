require("dotenv").config()
const ReliefCampaign = require("../models/reliefCampaign")
const { initiateDeveloperControlledWalletsClient } = require('@circle-fin/developer-controlled-wallets');
const uploadText = require('@lighthouse-web3/sdk')

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


const getAllReliefCampaigns = async (req, res) => {
    try {
        const allReliefCampaigns = await ReliefCampaign.find({})
        res.send(allReliefCampaigns)
    }
    catch (err) {
        console.log(err)
        res.send("Error getting campaigns")
    }
}

const getReliefCampaignById = async (req, res) => {
    try {
        const allReliefCampaigns = await ReliefCampaign.find({_id: req.params.id})
        res.send(allReliefCampaigns)
    }
    catch (err) {
        console.log(err)
        res.send("Error getting campaign")

    }
}

const claimFunds = async (req, res) => {
    try {
        const title = req.body.campaignTitle;
        const desc = req.body.campaignDescription;
        const fundDispensePerIndividual = req.body.fundDispensePerIndividual
        const campaignId = req.body.campaignId;
        const name = req.body.name;
        const email = req.body.email;
        const phone = req.body.phone;
        const address = req.body.address;
        const walletAddress = req.body.walletAddress;
        const walletId = req.body.walletId
        const currentFundBalance = req.body.currentFundBalance

        const circleDeveloperSdk = initiateDeveloperControlledWalletsClient({
            apiKey: process.env.CIRCLE_API_KEY,
            entitySecret: process.env.ENTITY_SECRET // Make sure to enter the entity secret from the step above.
          });
    

        const response = await circleDeveloperSdk.createTransaction({
            walletId: walletId,
            tokenId: '7adb2b7d-c9cd-5164-b2d4-b73b088274dc',
            destinationAddress: walletAddress,
            amounts: [fundDispensePerIndividual],
            fee: {
              type: 'level',
              config: {
                feeLevel: 'MEDIUM'
              }
            }
          });

        console.log(response.data)    

        
          const newBalance = Number(currentFundBalance)- Number(fundDispensePerIndividual)

        await ReliefCampaign.updateOne({_id: req.body.campaignId}, {currentFundBalance: newBalance})

        // Example of sending a response
        res.status(200).send(response.data)
    } catch (err) {
        console.error("Error processing request:", err);
        // Send error response if necessary
        res.status(500).json({ success: false, message: 'Internal server error.' });
    }
};



module.exports = {verifyProof, createReliefCampaign, getAllReliefCampaigns, getReliefCampaignById, claimFunds}