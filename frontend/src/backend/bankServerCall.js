

const BASE_URL = "https://bankingsoft.herokuapp.com/"

//create new account
export const creatNewAcc = (accHolderName)=>{
    return new Promise (async(resolve , reject)=>{
        let accReq ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({accHolderName})
        }
        try{
            let response = await fetch (BASE_URL + 'newAccount',accReq )
            let respJson = await response.json()
            if(response.status=== 200){
                resolve(respJson)
            }else{
                reject(respJson.errro)
            }
        }catch(err){
            reject("Network Issue")
        }
    })
}


//deposit amount
export const depositAmount = (accountNo , depAmount)=>{
    return new Promise (async(resolve , reject)=>{
        let accReq ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({depAmount})
        }
        try{
            let response = await fetch (BASE_URL + `bank/${accountNo}/deposit`, accReq )
            let respJson = await response.json()
            if(response.status=== 200){
                resolve(respJson)
            }else{
                reject(respJson.error)
            }
        }catch(err){
            reject("Network Issue")
        }
    })
}

//withdraw the amount
export const withDrawAmount = (accountNo , withDrawAmount)=>{
    return new Promise (async(resolve , reject)=>{
        let accReq ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({withDrawAmount})
        }
        try{
            let response = await fetch (BASE_URL + `bank/${accountNo}/withdraw`, accReq )
            let respJson = await response.json()
            if(response.status=== 200){
                resolve(respJson)
            }else{
                reject(respJson.error)
            }
        }catch(err){
            reject("Network Issue")
        }
    })
}

//transfer the amount
export const transferAmount = (account1, account2 , amount)=>{
    return new Promise (async(resolve , reject)=>{
        let accReq ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({account1, account2 , amount})
        }
        try{
            let response = await fetch (BASE_URL + `bank/transfer`, accReq )
            let respJson = await response.json()
            if(response.status=== 200){
                resolve(respJson)
            }else{
                reject(respJson.error)
            }
        }catch(err){
            reject("Network Issue")
        }
    })
}

//check the balance
export const checkAccBalance = (accountNo)=>{
    return new Promise (async(resolve , reject)=>{
        let accReq ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({accountNo})
        }
        try{
            let response = await fetch (BASE_URL + `bank/checkBalance`, accReq )
            let respJson = await response.json()
            if(response.status=== 200){
                resolve(respJson)
            }else{

                reject(respJson.error)
            }
        }catch(err){
            console.log(err)
            reject("Network Issue")
        }
    })
}