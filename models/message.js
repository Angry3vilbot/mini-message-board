const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    nickname: { type: String, required: true, minLength: 5, maxLength: 25 },
    message: { type: String, required: true, maxLength: 250 },
    date: { type: Date }
}, { versionKey: false })

module.exports = mongoose.model("Message", MessageSchema, "Messages")