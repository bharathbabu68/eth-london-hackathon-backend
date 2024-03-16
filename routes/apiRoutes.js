const express = require("express")
const apiController = require("../controllers/apiController")

const router = express.Router()

router.post("/verifyProof", apiController.verifyProof)

module.exports = router