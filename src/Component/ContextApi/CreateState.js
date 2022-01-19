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

    return (
        <Context.Provider value={{ChangeCurrency,currency,setcurrency,symbol}}>
            {props.children}
        </Context.Provider>
    )
}

export default CreateState;