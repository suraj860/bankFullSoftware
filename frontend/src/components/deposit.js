
import React, { useState  } from "react";
import { Button, Card, TextField } from "@mui/material";
import {depositAmount , withDrawAmount} from "../backend/bankServerCall";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {successBar, errorBar} from '../common/notificationBar'
import { useHistory } from "react-router-dom";
import {styles} from '../common/styles'

function DepositAmount(){

    const classes = styles

    const [accNo , setAccNo] = useState('')
    const [amount , setAmount] = useState('')
    const [viewBal , setViewBal] = useState(false)
    const [balance , setBalance] = useState()
    const history = useHistory()

    let path = history.location.pathname

    //handle the changes
    const handleChange = (e)=>{
        setViewBal(false)
        setBalance('')
        if(e.target.name === "accountNo"){
            setAccNo(e.target.value)
        }else if(e.target.name === "amount"){
            setAmount((e.target.value))
        }
    }

    //Tiggers when you have to deposit the money
    const deposit= async(name)=>{
        try{
            let response = await depositAmount(accNo.toUpperCase() , parseInt(amount))
             if(response.status){
                let {data , msg} = response
                console.log(response)
                successBar(msg)
                setBalance(data.balance)
                // setAccNo("")
                setAmount('')
            }
        }catch(err){
            console.log(err)
            errorBar(err)
        }
        
    }

    //Tiggers when you have to withdraw the money
    const withdrawAction = async(name)=>{
        try{
            let response = await withDrawAmount(accNo.toUpperCase() , parseInt(amount))
             if(response.status){
                let {data , msg} = response
                console.log(response)
                successBar(msg)
                setBalance(data.balance)
                // setAccNo("")
                setAmount('')
            }
        }catch(err){
            console.log(err)
            errorBar(err)
        }
        
    }

    //handle the submit
    const handleSubmit =(e)=>{
        e.preventDefault()
        if(e.target.name==="deposit"){
            deposit()
        }else{
            withdrawAction()
        }
         
    }

    return(
        <Card style={classes.container}>
            <ToastContainer/>
            <div style={styles.depositImg}>
                <img style={styles.img1} src="./images/depositimg.webp" alt="deposit"/>
            </div>
            <TextField
                variant="outlined"
                name='accountNo'
                label="AccountNo"
                value={accNo}
                onChange={handleChange}
                required
                size="small"
                sx={classes.textFields}
            />
            <br/>
            <TextField
                variant="outlined"
                name="amount"
                label={
                    path === "/deposit" ? 
                    "Deposit Amount" : "Withdraw Amount"}
                type="number"
                value={amount}
                size="small"
                onChange={handleChange}
                required
                sx={classes.textFields}
            />
            
            {
                viewBal ? 
                <div style={classes.balanceDiv}>
                    <p style={{margin:"0px"}}>
                        Your Balance For AccountNo  
                        <span style={{color:"#396EB0" , fontWeight:"bold"}}> {accNo}</span> is 
                        <span style={{color:"#396EB0" , fontWeight:"bold"}}> { balance}</span>
                    </p>
                </div> : null
            }
            <br/>

            <Button 
            disabled={!balance} 
            style={{margin:"0px 20px 20px 0px"}}
            variant="contained"
            onClick={()=>setViewBal(!viewBal)}>
                View Balance
            </Button>

            <Button 
            variant="contained" 
            style={{margin:"0px 0px 20px 20px"}}
            name={
                path === "/deposit" ? 
                "deposit" : "withdraw"}
            onClick={handleSubmit}
            disabled={accNo==="" || amount === '' }>
                {
                   path === "/deposit" ? " Deposit Amount" : "Withdraw Amount"
                }
            </Button><br/>

            <Button 
            style={{marginBottom:"30px"}}
            onClick={()=>history.push('/')} 
            variant="contained">
                Back
            </Button>
           
        </Card>
    )
}

export default DepositAmount;