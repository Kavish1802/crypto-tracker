import { Container, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles';
import React from 'react'
import Carousel from './Carousel';

const makeStyle=makeStyles(()=>({
    dimension:{
        backgroundImage:"url(https://raw.githubusercontent.com/piyush-eon/react-crypto-tracker/master/public/banner2.jpg)"
    },
    innerstyle:{
        height:"500px",
        display:"flex",
        flexDirection:"column",
        padding:"25px",
        justifyContent:"space-around"
    },
    tagline:{
        display:"flex",
        height:"40%",
        flexDirection:"column",
        justifyContent:"center",
        textAlign:"center",
    }
}))

const BelowNavbar = () => {

    const classes=makeStyle();

    return (
        <div className={classes.dimension}>
            <Container className={classes.innerstyle}>
                <div className={classes.tagline}>
                    <Typography
                    variant='h2'
                    style={{
                        fontWeight:"bold",
                        marginBottom:15,
                        fontFamily:"Montserrat",
                        textAlign:"center",
                        justifyContent:"center"
                    }}
                    >
                        Crypto Hunter
                    </Typography>
                    <Typography
                    variant='h6'
                    style={{
                        fontFamily:'Montserrat, sans-serif',
                        textAlign:"center",
                        fontSize:"0.8rem",
                        color:"#919C9C"
                    }}
                    >
                        Get all info reguarding the crypto market here
                    </Typography>
                </div>
                <Carousel/>
            </Container>
        </div>
    )
}

export default BelowNavbar
