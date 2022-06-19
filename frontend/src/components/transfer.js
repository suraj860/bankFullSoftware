
import React, { useState  } from "react";
import { Button, Card, TextField } from "@mui/material";
import {transferAmount} from "../backend/bankServerCall";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {successBar, errorBar} from '../common/notificationBar'
import { useHistory } from "react-router-dom";
import {styles} from '../common/styles'


function TransferAmount(){
    const classes = styles
    const [account1 , setAccount1] = useState('') // source account
    const [account2 , setAccount2] = useState('') //target account
    const [amount , setAmount] = useState('') //value
    const history = useHistory()

    const handleChange = (e)=>{
        let { name , value} = e.target
        if(name==="account1"){
            setAccount1(value)
        }else if(name==="account2"){
            setAccount2(value)
        }else{
            setAmount(value)
        }
    }

    //transfer money
    const transfer = async()=>{
        try{
            let response = await transferAmount(
                account1.toUpperCase() , 
                account2.toUpperCase() , 
                parseInt(amount)
            )
            if(response.status){
                let {data} = response
                console.log(response)
                successBar(data)
                setAccount1("")
                setAccount2('')
                setAmount('')
            }
        }catch(err){
            console.log(err)
            errorBar(err)
        }
       
    }


    const handleSubmit = (e)=>{
        e.preventDefault()
        if(account1==="" || account2 === "" || amount===""){
            errorBar("Enter valid inputs")
        }else{
            transfer()
        }
    }

    return(
        <Card elevation={2} style={classes.container}>
            <ToastContainer/>
            <div style={styles.transferImg}>
                <img style={styles.img1} src="./images/transfer.gif" alt="transfer"/>
            </div>
            <div style={classes.testInfo}>
                    <p style={{margin:"0px"}}>
                    In case to transfer amount both accounts should to be registered
                    </p>
            </div>
            <TextField
                variant="outlined"
                label="Transfer from"
                name="account1"
                value={account1}
                onChange={handleChange}
                required
                size="small"
                style={{marginTop:"0px"}}
                sx={classes.textFields}
            /><br/>

            <TextField
                variant="outlined"
                label="Transfer to"
                name="account2"
                value={account2}
                onChange={handleChange}
                required
                size="small"
                sx={classes.textFields}
            /><br/>

            <TextField
                variant="outlined"
                label="Enter amount"
                name="amount"
                value={amount}
                onChange={handleChange}
                required
                size="small"
                sx={classes.textFields}
            /><br/>

            <Button 
                variant="contained"
                onClick={handleSubmit}
                disabled={account1==="" || account2 === "" || amount===""}
                style={{margin:"0px 30px 30px 0px"}}
            >
                Transfer Amount
            </Button>

            <Button   style={{margin:"0px 0px 30px 30px"}} variant="contained" onClick={()=>history.push('/')}>Back</Button>
        </Card>
    )
}

export default TransferAmount;