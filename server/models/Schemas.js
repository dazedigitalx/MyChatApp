const { default: mongoose } = require('mongoose')

const MongoDB = require('mongoose')
const Schema = mongoose.Schema

const messagesSchema = new Schema({
    id: {type:String, required: true},
    sender_id: { type:String, required:true},
    receiver_id: {type: String, required:true},
    content: { type:String, required: true},
    timestamp: { type: Date, default: Date.now }
})


module.exports = mongoose.model('messages', messagesSchema);