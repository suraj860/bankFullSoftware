
const mongoose = require('mongoose')

const {Schema} = mongoose

const deposistLogsSchema = new Schema({
    accountNo:{
        type: String,
        required : true
    },
    logDate:{
        type: Date,
        required:true
    },
    depositAmount:{
        type:String
    }
})

module.exports = mongoose.model('deposistLogs' , deposistLogsSchema , 'deposistLogs')