import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "./CreateContext";


const CreateState = (props) => {

    const navigate=useNavigate();
    const [currency, setcurrency] = useState("INR")
    const [symbol, setsymbol] = useState("₹")
    const url = "http://localhost:8000/"
    // const [credintials, setcredintials] = useState({ name: '', email: '' ,password:''});

    const AlertMessage=()=>{
        alert('invalid credintials')
    }

    const SignupUser=async (name,email,password)=>{
        // console.log(credintials);
        const response=await fetch(`${url}Cryptoapi/auth/signUp`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:name,email:email,password:password})
        });
        const json=await response.json();
        console.log(json);

        if(json.success)
        {
            localStorage.setItem('token',json.message);
            navigate('/');
        }
        else
        {
            AlertMessage();
        }
    }

    const LoginUser=async (email,password)=>{
        const response=await fetch(`${url}Cryptoapi/auth/login`,{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:email,password:password})
        });
        const json=await response.json();
        if(json.success)
        {
            localStorage.setItem('token',json.message);
            navigate('/');
        }
        else
        {
            AlertMessage();
        }
    }

    const ChangeCurrency = () => {
        if (currency === "INR") {
            setsymbol("$")
        }
        else {
            setsymbol("₹")
        }
        // console.log(symbol)
    }

    const fullchange = () => {
        console.log('yay');
        if (currency === "INR") {
            setsymbol("$")
            setcurrency('USD')
        }
        else {
            setsymbol("₹")
            setcurrency('INR');
        }
        // console.log(symbol)
    }

    // const SignupUser

    return (
        <Context.Provider value={{ ChangeCurrency, currency, setcurrency, symbol, setsymbol, fullchange, SignupUser, LoginUser }}>
            {props.children}
        </Context.Provider>
    )
}

export default CreateState;