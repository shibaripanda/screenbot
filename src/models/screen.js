import mongoose from 'mongoose'

const Schema = mongoose.Schema

const screenSchema = new Schema({
owner: {
    type: String,
    required: true,
    default: '66bbd8ff1552e60673dc1dc7',
},
name: {
    type: String,
    required: false,
},
media: {
    type: Array,
    required: true,
    default: []
},
document: {
    type: Array,
    required: true,
    default: []
},
audio: {
    type: Array,
    required: true,
    default: []
},
text: {
    type: String,
    required: false,
},
buttons: {
    type: Array,
    required: true,
    default: []
},
protect: {
    type: Boolean,
    required: true,
    default: true
},
status: {
    type: Boolean,
    required: true,
    default: true
}
}, { timestamps: true});


export const Screen = mongoose.model('Screen', screenSchema)
