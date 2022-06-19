
const mongoose = require('mongoose')

const {Schema} = mongoose

const transferLogSchema = new Schema({
    accountNo:{
        type: String,
        required : true
    },
    logDate:{
        type: Date
    }
})

module.exports = mongoose.model('transferLog' , transferLogSchema , 'transferLog')