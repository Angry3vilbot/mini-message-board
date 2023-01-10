const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ImageSchema = new Schema({
    nickname: { type: String, required: true, minLength: 5, maxLength: 25 },
    image: { data: Buffer, contentType: String },
    date: { type: Date }
}, { versionKey: false })

module.exports = mongoose.model("Image", ImageSchema, "Images")