import React,{useState} from "react";
import Context from "./CreateContext";

const CreateState=(props)=>{

    const [currency, setcurrency] = useState("INR")
    const [symbol, setsymbol] = useState("₹")

    const ChangeCurrency=()=>{
        if(currency==="INR")
        {
            setsymbol("$")
        }
        else
        {
            setsymbol("₹")
        }
        // console.log(symbol)
    }

    const fullchange=()=>{
        console.log('yay');
        if(currency==="INR")
        {
            setsymbol("$")
            setcurrency('USD')
        }
        else
        {
            setsymbol("₹")
            setcurrency('INR');
        }
        // console.log(symbol)
    }

    return (
        <Context.Provider value={{ChangeCurrency,currency,setcurrency,symbol,setsymbol,fullchange}}>
            {props.children}
        </Context.Provider>
    )
}

export default CreateState;