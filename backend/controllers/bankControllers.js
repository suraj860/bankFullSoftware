
const Accounts = require('../models/account')
const Withdrawlogs = require('../models/withdrawLogs')
const Depositlogs = require('../models/depositsLogs')
const TransferLogs = require('../models/transferLogs')
const {startOfDay , endOfDay} = require('date-fns')

//CREATE NEW ACCOUNT
exports.createAccount = async(req , res)=>{
    try{
        let { accHolderName } = req.body
        let accountNo = "BANK" + Math.floor(Math.random()*100000)
        let acc = await Accounts.create({ 
            accountNo : accountNo,
            accHolderName : accHolderName,
            balance: 0
        })
        if(acc){
            console.log("new account created")
            return(
                res.status(200).send({status: true , data: acc , msg : `Acc created successfully`})
            )
        }else{
            return(
                res.status(400).send({status: false , error: "something went wrong"})
            )
        }
    }catch(err){
        console.log(err)
        return(
            res.status(400).send({status:false , error:"server error"})
        )
    }
}


//DEPOSIT AMOUNT
exports.depositAmount = async (req , res)=>{
    try{
        let accountNo = req.params.accNo
        let {depAmount} = req.body

        //CHECK HOW MUCH DEPOSISTS ARE DONE IN ONE DAY
        //ALLOW ONLY THREE DEPOSISTS IN A DAY

        let depositCount = await Depositlogs.find({
            accountNo : accountNo , 
            logDate : {$gte: startOfDay(new Date()) , $lte: endOfDay(new Date ())}
        })
        console.log(depositCount.length)
        if(depositCount.length === 3){

            return(
                res.status(400).send({status:false , error:"You have exhausted your daily deposit limit"})
            )

        }else{

            //CHECK FOR MAX AND MIN AMOUNT DEPOSITABLE
            if(50000 < depAmount){
                console.log(depAmount)
                return (
                    res.status(400).send({status:false , error : "maximum deposit amount is 50000rs"})
                )
            }else if(depAmount < 500){
                return (
                    res.status(400).send({status:false , error : "minimum deposit amount is 500rs"})
                )
            }else{
                let accBalance = await Accounts.findOne({accountNo : accountNo})
                if(accBalance){
                    let balance = accBalance.balance

                    //CHECK IF ON ADDING DEPOSIT AMOUNT DOES BALANCE EXCEED 100000 LIMIT
                    if((balance + depAmount) > 100000){
                        console.log(depAmount , (balance + depAmount))
                        return(
                            res.status(400).send({status: false , error: "Account balance cannot exceed 100000"})
                        )
                    }else{
                        await Accounts.findOneAndUpdate(
                            {accountNo : accountNo} , 
                            {$set:{balance :(balance + depAmount)}} ,
                            {new :true}
                        )
                        .then(async(data)=>{
                            //CREATA DEPOSIT LOG FOR THE DAY
                            if(data){
                                await Depositlogs.create({
                                    accountNo : accountNo , 
                                    logDate : new Date() , 
                                    depositAmount : depAmount })
                            }
                            return(
                                res.status(200).send({status:true , data:data ,  msg: depAmount + " deposited successfully"})
                            )
                        }).catch((error)=>{
                            console.log(error)
                            res.status(400).send({status:false , error: "something went wrong"})
                        })
                    }
                }else{
                    return(
                        res.status(400).send({status:false , error : "Invalid account number"})
                    )
                }
            }
        }
       
    }catch(error){
        console.log(error)
        return(
            res.status(400).send({status:false , error:"server error"})
        )
    }
}

//WITHDRAW AMOUNT
exports.withDrawAmount = async(req , res)=>{
    try{
        let accountNo = req.params.accNo
        let {withDrawAmount} = req.body

        //CHECK HOW MUCH WITHDRAWS ARE DONE IN ONE DAY
        //ALLOW ONLY THREE WITHDRAWS IN A DAY

        let withDrawCount = await Withdrawlogs.find({ 
            accountNo : accountNo , 
            logDate : {
                $gte: startOfDay(new Date()) , 
                $lte: endOfDay(new Date ())
            } 
        })
        if(withDrawCount.length===3){
            return(
                res.status(400).send({status:false , error:"You have exhausted your daily withdrawl limit"})
            )
        }else{

            //CHECK FOR WITHDRAW AMOUNT LIMIT

            if(25000 < withDrawAmount){
                console.log(withDrawAmount)
                return (
                    res.status(400).send({status:false , error : "maximum withdrawl amount is  25000rs"})
                )
            }else if( withDrawAmount < 1000){
                return (
                    res.status(400).send({status:false , error : "minimum withdrawl amount is  1000rs"})
                )
            }else{
                let accBalance = await Accounts.findOne({accountNo : accountNo})

                if(accBalance){
                    let balance = accBalance.balance

                    //CHECK FOR CHECKING IS THERE SUFFICIENT BALANCE FOR WITHDRAWL

                    if((balance - withDrawAmount) < 0){
                        return(
                            res.status(400).send({status:false , error:"Insufficient balance"})
                        )
                    }
                    else{
                        await Accounts.findOneAndUpdate({accountNo: accountNo} ,  {$set:{balance :(balance - withDrawAmount)}} , {new :true})
                        .then(async(data)=>{
                            //CREATA A LOG FOR WITHDRAWL FOR THAT DAY
                            if(data){
                                await Withdrawlogs.create({
                                    accountNo: accountNo,
                                    logDate: new Date(),
                                    withDrawAmount : withDrawAmount
                                })
                            }
                            return(
                                res.status(200).send({status:true , data : data , msg : "Amount withdraw successfull"})
                            )
                        })
                        .catch((error)=>{
                            console.log(error)
                            res.status(400).send({status:false , error: "something went wrong"})
                        })
                    }
                }else{
                    //IF ACCOUNTNO IS INVALID
                    return(
                        res.status(400).send({status:false , error : "Invalid account number"})
                    )
                }
            }
        }
    }catch(error){
        console.log(error)
        return(
            res.status(400).send({status:false , error:"server error"})
        )
    }
}

//TRANSFER AMOUNT
exports.transferAmount = async(req, res)=>{
    try{
        let {account1 , account2 , amount} = req.body
        //CHECK THE NUMBER OF TRANSFER  FOR THE DAY
        //RECEIVER ACCOUNT CAN RECEIVE ONLY 3 TRANSFERS IN A DAY
        let transferCount =  await TransferLogs.find({
            accountNo : account2 ,
            logDate : {
                $gte: startOfDay(new Date()) , 
                $lte: endOfDay(new Date ())
            } 
        })
        if(transferCount.length===3){
            return(
                res.status(400).send({status:false , error:"Receiver exhausted daily transfer limit"})
            )
        }else{
            //CHECK FOR TRANSFER AMOUNT LIMIT

            if(amount >30000 ){
                return (
                    res.status(400).send({status:false , error : "maximum transfer  amount is  30000rs"})
                )
            }else if(amount < 1000){
                return (
                    res.status(400).send({status:false , error : "minimum transfer  amount is  1000rs"})
                )
            }else{
                let accountCheck = await Accounts.find({$or:[{accountNo : account1},{accountNo : account2}]})
                if(accountCheck.length === 2){
                    
                   let transferFrom = accountCheck.find((acc)=>acc.accountNo === account1)
                   let transferTo = accountCheck.find((acc)=>acc.accountNo === account2)

                   //CHECK FOR MAX AMOUNT BALANCE LIMIT i.e 100000
                    if((transferTo.balance + amount)>100000){
                        console.log(transferTo)
                        return(
                            res.status(400).send({status:false , error:"Receiver balance exceeds 100000 limit after transfer"})
                        )
                    }else if((transferFrom.balance)-amount < 0){
            
                        return(
                            res.status(400).send({status:false , error:"Insufficient balance to transfer"})
                        )
                    }else{

                        //UPDATE THE BALANCE OF RECEIVER AS WELL AS TRANSFERER ACCOUNT

                        let minusBalance = transferFrom.balance
                        let addBalance = transferTo.balance
                        await Accounts.findOneAndUpdate({accountNo : account1}, {$set:{balance : (minusBalance - amount)}})
                        .then(async(data)=>{
                            await Accounts.findOneAndUpdate({accountNo : account2}, {$set:{balance : (addBalance + amount)}})
                            if(data){
                                await TransferLogs.create({
                                    accountNo: account2,
                                    logDate: new Date()
                                })
                            }
                            return(res.status(200).send({status:true , data: "Amount Transfered successfully"}))
                        }).catch((error)=>{
                            res.status(400).send({status:false , error: "something went wrong"})
                        })
                    }
                }else{
                    //IF ACCOUNT NUMBER IS INVALID
                    if(accountCheck.length === 0){
                        return(
                            res.status(400).send({status: false , error: `Invalid account numbers`})
                        )
                    }else{
                        let valid = accountCheck[0].accountNo
                        if(valid === account1){
                            return(
                                res.status(400).send({status: false , error: `${account2} is an invalid accountNo`})
                            )
                        }else{
                            return(
                                res.status(400).send({status: false , error: `${account1} is an invalid accountNo`})
                            ) 
                        }
                    }
                   
                }
            }
        }
    }catch(error){
        console.log(error)
        return(
            res.status(400).send({status:false , error:"server error"})
        )
    }
}


//CHECK ACCOUNT BALANCE
exports.checkBalance = async (req , res)=>{
    let accountNo = req.body.accountNo
    try{
        let acc = await Accounts.findOne({accountNo : accountNo})
        if(acc){
            return(
                res.status(200).send({ status:true , data: acc })
            )
        }else{
            return(
                res.status(400).send({status:false , error:"Invalid AccountNo"})
            )
        }
    }catch(error){

    }
}