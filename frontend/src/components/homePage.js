
import React from "react";
import {Button, Card } from '@mui/material';
import { Options } from '../common/CONSTANTS'
import { useHistory } from "react-router-dom";
import {styles} from '../common/styles'

function Home(){
    const classes = styles
    const history = useHistory()

    return(
        <Card elevation={2} style={classes.container} >
            <div style={styles.homeImg}>
                <img style={styles.img1} src="./images/bankimg2.jpg" alt="bank"/>
            </div>
             <div style={classes.testInfo}>
                    <p style={{margin:"0px"}}>
                    For Testing you can use AccNo - BANK51412 (balance-5000) and AccNo - BANK6258 (balance-5000)
                    </p>
            </div>
            {
                Options.map((item , i)=>(
                    <Button key={i} 
                    style={{backgroundColor:item.color}}
                    variant="contained" 
                    size="large"
                    onClick={()=>history.push(item.path)}
                    sx={classes.btn}
                    >
                        {item.name} 
                    </Button>
                ))
            }
            
        </Card>
    )
}

export default Home;