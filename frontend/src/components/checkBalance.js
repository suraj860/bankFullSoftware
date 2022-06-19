
import React, { useState  } from "react";
import { Button, Card, TextField } from "@mui/material";
import {checkAccBalance} from "../backend/bankServerCall";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {errorBar } from '../common/notificationBar'
import { useHistory } from "react-router-dom";
import {styles} from '../common/styles'

function CheckBalance(){
    const classes = styles
    const [balance , setBalance] = useState(false)
    const [success , setSuccess] = useState(false)
    const [accNo , setAccNo] = useState('')
    const history = useHistory()

    //handle textfield input change
    const handleChange =(e)=>{
        setSuccess(false)
        setAccNo(e.target.value)
    }
    
    //function to check the balance
    const check = async()=>{
        try{
            let response = await checkAccBalance((accNo).toUpperCase())
            if(response.status){
               setSuccess(true)
               setBalance(response.data.balance)
            }
        }catch(err){
            errorBar(err)
        }
    }

    return(
        <Card style={classes.container}>

            <ToastContainer/>

            <div style={styles.creatAcc}>
                <img style={styles.img1} src="./images/createAccount.jpg" alt="account"/>
            </div>

            <TextField
             variant="outlined"
             label="Enter Accno."
             onChange={handleChange}
             required
             size="small"
             sx={classes.textFields}
             /><br/>
             {
                success ? 
                <div style={classes.accNoInfo}>
                    <p style={{margin:"0px"}}>
                        Your Account Balance  is
                        <span style={{color:"#396EB0" , fontWeight:"bold"}}> {balance}</span>
                    </p>
                </div> : null
             }
             <Button 
                variant="contained" 
                onClick={check}
                disabled={accNo===''}
                style={{margin:"10px 20px 50px 0px"}}
             >
                check Balance
            </Button>
             <Button style={{margin:"10px 0px 50px 20px"}} variant="contained" onClick={()=>history.push('/')}>Back</Button>
        </Card>
    )
}

export default CheckBalance;