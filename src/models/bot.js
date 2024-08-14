import mongoose from 'mongoose'

const Schema = mongoose.Schema

const botSchema = new Schema({
token: {
    type: String,
    required: false,
},
status: {
    type: Boolean,
    required: true,
    default: false
}
}, { timestamps: true});


export const Bot = mongoose.model('Bot', botSchema)
