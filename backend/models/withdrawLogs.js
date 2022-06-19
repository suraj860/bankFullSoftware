
const mongoose = require('mongoose')

const {Schema} = mongoose

const withDrawlLogSchema = new Schema({
    accountNo:{
        type: String,
        required : true
    },
    logDate:{
        type: Date,
        required : true
    },
    withDrawAmount:{
        type: Number,
        required:true
    }
})

module.exports = mongoose.model('withdrawLogs' , withDrawlLogSchema , 'withdrawLogs')