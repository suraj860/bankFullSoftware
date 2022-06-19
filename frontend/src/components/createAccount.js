
import React, { useState  } from "react";
import { Button, Card, TextField } from "@mui/material";
import {creatNewAcc} from "../backend/bankServerCall";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {errorBar, successBar } from '../common/notificationBar'
import { useHistory } from "react-router-dom";
import {styles} from '../common/styles'

function CreatNewAccount(){
    const classes = styles
    const [name , setName] = useState('')
    const [success , setSuccess] = useState(false)
    const [accNo , setAccNo] = useState('')
    const history = useHistory()

    //handle textField changes
    const handleChange =(e)=>{
        setSuccess(false)
        setAccNo('')
        setName(e.target.value)
    }
    
   //create new account
    const newAccount = async()=>{
        try{
            let response = await creatNewAcc(name)
            if(response.status){
               successBar(response.msg)
               setSuccess(true)
               setAccNo(response.data.accountNo)
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
             label="Enter Name"
             onChange={handleChange}
             required
             size="small"
             sx={classes.textFields}
             /><br/>
             {
                success ? 
                <div style={classes.accNoInfo}>
                    <p style={{margin:"0px"}}>
                        {name} Your AccountNo is
                        <span style={{color:"#396EB0" , fontWeight:"bold"}}> {accNo}</span>
                    </p>
                </div> : null
             }
             <Button 
                variant="contained" 
                onClick={newAccount}
                disabled={name===''}
                style={{margin:"10px 20px 50px 0px"}}
             >
                Create Account
            </Button>
             <Button style={{margin:"10px 0px 50px 20px"}} variant="contained" onClick={()=>history.push('/')}>Back</Button>
        </Card>
    )
}

export default CreatNewAccount;