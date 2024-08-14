import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
id: {
    type: Number,
    required: true,
},
data: {
    type: Object,
    required: true,
},
activBot: {
    type: Boolean,
    required: false
}
}, { timestamps: true});


export const User = mongoose.model('User', userSchema)
