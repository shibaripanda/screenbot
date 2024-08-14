import mongoose from 'mongoose'

const Schema = mongoose.Schema

const screenSchema = new Schema({
owner: {
    type: String,
    required: false,
},
name: {
    type: String,
    required: false,
},
media: {
    type: Array,
    required: false,
},
text: {
    type: String,
    required: false,
},
buttons: {
    type: Array,
    required: false,
},
protect: {
    type: Boolean,
    required: false,
},
status: {
    type: Boolean,
    required: false,
    default: false
}
}, { timestamps: true});


export const Screen = mongoose.model('Screen', screenSchema)
