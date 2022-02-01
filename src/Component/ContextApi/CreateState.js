import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "./CreateContext";


const CreateState = (props) => {

    const navigate=useNavigate();
    const [currency, setcurrency] = useState("INR")
    const [symbol, setsymbol] = useState("₹")
    const [watchdata, setwatchdata] = useState([]);
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
            localStorage.setItem('token',email);
            navigate('/');
        }
        else
        {
            AlertMessage();
        }
        console.log(localStorage.getItem('token'));
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
            localStorage.setItem('token',email);
            // console.log(localStorage.getItem('token'));
            navigate('/');
        }
        else
        {
            AlertMessage();
        }
        console.log(localStorage.getItem('token'));
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

    // watchlist********************

    const ExtractWatchList=async ()=>{

        // setwatchdata([]);
        const response=await fetch(`${url}Cryptoapi/authPortfolio/fetchAllCoin`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({user:localStorage.getItem('token')})
        });

        const json=await response.json();
        setwatchdata(json.message);

        // if(json.success)
        // {
        //     console.log(json);
        //     json.message.map((data)=>{
        //         console.log(data,data.name);
        //         setwatchdata(watchdata.concat(data.name));
        //         // console.log(watchdata)
        //     })
        // }
    }

    const ConcatCoin=async (id)=>{
        

        // ExtractWatchList();

        const response=await fetch(`${url}Cryptoapi/authPortfolio/addCoin`,{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({id:id,user:localStorage.getItem('token')})
            // body:JSON.stringify({id:id,user:'req.user'})
        })

        const json=await response.json();

        console.log(json);
        if(json.success===false)
        {
            alert('already added');
        }
        else
        {
            // setwatchdata(watchdata.concat(json.message));
            // console.log(json.message);
            alert('added');
        }
    }

    const DeleteCoin=async (id)=>{
        const response=await fetch(`${url}Cryptoapi/authPortfolio//deleteCoin/:${id}`,{
            method:'DELETE',
            headers:{
                'Content-Type': 'application/json',
            },
            // body:JSON.stringify({id:id,user:localStorage.getItem('token')})
            body:JSON.stringify({id:id})
        })

        const json=await response.json();

        console.log(json);

        if(json.success)
        {
            navigate('/watchlist');
            // alert('deleted');
        }
        else
        {
            alert('could not delete');
        }
    }

    // *****************************

    return (
        <Context.Provider value={{ ChangeCurrency, currency, setcurrency, symbol,
                                 setsymbol, fullchange, SignupUser, LoginUser, 
                                 watchdata, setwatchdata, ExtractWatchList, ConcatCoin, DeleteCoin }}>
            {props.children}
        </Context.Provider>
    )
}

export default CreateState;