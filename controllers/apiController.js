require("dotenv").config()

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

module.exports = {verifyProof}