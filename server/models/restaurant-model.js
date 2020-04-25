const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Restaurant = new Schema(
    {
        name: { type: String, required: true },
        status: { type: String, required: false },
        precautions: { type: String, required: false },
        score: {type: Number, required: false }
    },
    { timestamps: true },
)

module.exports = mongoose.model('restaurant', Restaurant)
