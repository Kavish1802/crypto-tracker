import React, { useEffect } from 'react'
import {Button, makeStyles} from '@material-ui/core'

const usestyles=makeStyles((theme)=>({
    container:{
        display:'flex',
        justifyContent:'space-around',
    },
}))

export const ChartButton = ({unit,setunit}) => {

    const classes=usestyles();

    // const handleClick=(e)=>{
    //     // setunit(e.target.value)
    //     console.log(e.value)
    // }

    // useEffect(() => {
    //     console.log(unit);
    // }, [unit])

    return (
        <div className={classes.container}>
            <Button
            variant='outlined'
            style={{
                color:unit===1?'black':'',
                backgroundColor:unit===1?'gold':'',
                fontWeight:unit===1?700:500,
            }}
            onClick={()=>{
                console.log(1)
                setunit(1)
                // console.log(unit);
            }}
            // defaultValue={1}
            >
                1 Day
            </Button>
            <Button
            variant='outlined'
            style={{
                color:unit===30?'black':'',
                backgroundColor:unit===30?'gold':'',
                fontWeight:unit===30?700:500,
            }}
            onClick={()=>{
                console.log(30)
                setunit(30)
                // console.log(unit);
            }}
            // defaultValue={30}
            >
                30 Days
            </Button>
            <Button
            variant='outlined'
            style={{
                color:unit===90?'black':'',
                backgroundColor:unit===90?'gold':'',
                fontWeight:unit===90?700:500,
            }}
            onClick={()=>{
                console.log(90)
                setunit(90)
                // console.log(unit);
            }}
            // defaultValue={90}
            >
                3 Months
            </Button>
            <Button
            variant='outlined'
            style={{
                color:unit===365?'black':'',
                backgroundColor:unit===365?'gold':'',
                fontWeight:unit===365?700:500,
            }}
            onClick={()=>{
                console.log(365)
                setunit(365)
                // console.log(unit);
            }}
            // defaultValue={365}
            >
                1 Year
            </Button>
            
        </div>
    )
}
