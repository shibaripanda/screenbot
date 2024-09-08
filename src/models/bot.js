import mongoose from 'mongoose'

const Schema = mongoose.Schema

export const BotSchema = new Schema({
  owner: {type: Number},
  token: {type: String},
  status: {type: Boolean},
  name: {type: String},
  username: {type: String},
  mode: {type: String},
  }, {timestamps: true})

// const botSchema = new Schema({
// token: {
//     type: String,
//     required: false,
// },
// status: {
//     type: Boolean,
//     required: true,
//     default: false
// }
// }, { timestamps: true});


export const Bot = mongoose.model('Bot', BotSchema)
