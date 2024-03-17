const express = require("express")
const apiController = require("../controllers/apiController")

const router = express.Router()

router.post("/verifyProof", apiController.verifyProof)

router.post("/createReliefCampaign", apiController.createReliefCampaign)

router.post("/claimFunds", apiController.claimFunds)

router.get("/getAllReliefCampaigns", apiController.getAllReliefCampaigns)

router.get("/getReliefCampaignById/:id", apiController.getReliefCampaignById)


module.exports = router