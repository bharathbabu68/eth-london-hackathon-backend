const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const reliefCampaignSchema = new Schema({
    campaignTitle: {
        type: String,
        required: true,
    },
    campaignDescription: {
        type: String,
        required: true,
    },
    allocatedFundAmount: {
        type: String,
        required: true,
    },
    fundDispensePerIndividual: {
        type: String,
        required: true,
    },
    fundingOrganization: {
        type: String,
        required: true,
    },
    fundingWalletAddress: {
        type: String,
        required: true
    },
    walletId: {
        type: String,
        required: true
    },
    currentFundBalance: {
        type: String,
        required: true
    }
})

const ReliefCampaign = mongoose.model("reliefcampaigns", reliefCampaignSchema);

module.exports = ReliefCampaign;