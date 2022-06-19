
exports.connect =()=>{
    try{
        const mongoose = require('mongoose')
        mongoose.connect(
            'mongodb+srv://suraj:admin123@cluster0.lyboc.mongodb.net/bankSoftware?retryWrites=true&w=majority'
         ,  {useNewUrlParser :true , useUnifiedTopology: true}
         )
    }catch(error){
        console.log(err)
        process.exit()
    }
}

// mongodb://localhost:27017/bankSoftware