
const mongoose = require('mongoose')

const {Schema} = mongoose

 const accountSchema = new Schema({
    accountNo:{
        type: String,
        required:true
    },
    accHolderName:{
        type: String,
        required:true
    },
    balance:{
        type: Number,
        required : true
    }
 })

 module.exports = mongoose.model('accounts' , accountSchema , 'accounts' )