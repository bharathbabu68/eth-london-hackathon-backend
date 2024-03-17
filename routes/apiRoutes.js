const express = require("express")
const apiController = require("../controllers/apiController")

const router = express.Router()

router.post("/verifyProof", apiController.verifyProof)

router.post("/createReliefCampaign", apiController.createReliefCampaign)

module.exports = router