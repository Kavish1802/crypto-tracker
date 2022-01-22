import { Container, LinearProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core'
import { createTheme, Pagination } from '@mui/material'
import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Context from '../ContextApi/CreateContext'
import { CoinList } from '../gecko/geckoApi'
import '../FontStyle.css'

// import alanBtn from '@alan-ai/alan-sdk-web';

// const alanKey='8e542ce0b8a7c315c916690fe0240d2c2e956eca572e1d8b807a3e2338fdd0dc/stage'

const usestyle=makeStyles((theme)=>({
    neg:{
        color:'#E64239',
    },
    pos:{
        color:'#6AE324'
    },
    row:{
        backgroundColor:'#16171a',
        cursor:'pointer',
        "&:hover":{
            backgroundColor:'rgb(41, 46, 46)'
        }
    },
    pagination:{
        "& .MuiPaginationItem-root":{
            color:"gold"
        }
    }
}))

export const CryptoTable = () => {

    const classes=usestyle();

    const capi=useContext(Context);

    const [fetchCoin, setfetchCoin] = useState([])
    const [loading, setloading] = useState(false);
    const [search, setsearch] = useState('')
    const [page, setpage] = useState(1)
    
    const FetchCoin=async ()=>{
        setloading(true);
        const {data}=await axios.get(CoinList(capi.currency))
        setfetchCoin(data)
        setloading(false);
    }

    useEffect(() => {
        FetchCoin();
    }, [capi.currency])

    // useEffect(() => {
    //     searchOnChange(document.getElementById('searchCryptoHome'));
    // }, []);
    

    // useEffect(() => {
    //     alanBtn({
    //         key:alanKey,
    //         onCommand:({command,val})=>{
    //             if(command==='search')
    //             {
    //                 console.log('search',val);
    //             }
    //         }
    //     })
    // }, []);
    

    // console.log(fetchCoin);

    const darkTheme=createTheme({
        palette:{
            primary:{
                main:'#fff'
            },
            type:'dark'
        },
    })

    const handleSearch=()=>{
        return fetchCoin.filter((coin)=>(
            coin.name.toLowerCase().includes(search)||
            coin.symbol.toLowerCase().includes(search)
        ))
    }

    const displayPrice=(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    const displayChange=(x)=>{
        x=x.toString(10);
        if(x.charAt(0)==='-')
        {
            return (<div className={classes.neg}>
                {capi.symbol}{' '}{x}
            </div>)
        }

        return (
            <div className={classes.pos}>
                {capi.symbol}{' '}{x}
            </div>
        )
    }

    const searchOnChange=(e)=>{
        setsearch(e.target.value);
        console.log('change called');
    }

    console.log(search);
    

    const navigate=useNavigate();
    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign:'center'}}>
                <Typography
                variant='h4'
                style={{margin:18,fontFamily:'Montserrat'}}
                >
                    Crypto Prices by Market cap
                </Typography>

                <TextField 
                label="Search for a Crypto..." 
                variant='outlined'
                id='searchCryptoHome'
                style={{marginBottom:20,width:'100%',color:'white'}}
                onChange={searchOnChange}
                onClick={searchOnChange}
                />
            

            <TableContainer>
                {loading?(
                    <LinearProgress color="primary"/>
                ):(
                    <Table>
                        <TableHead style={{backgroundColor:'#EBC000'}}>
                            <TableRow>
                                {['Coin','Price','24h Change','Market Cap'].map((head)=>(
                                    <TableCell
                                    style={{
                                        color:'black',
                                        fontWeight:'700',
                                        fontFamily:'Montserrat',
                                    }}
                                    key={head}
                                    align='center'
                                    >
                                        {head}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch()
                            .slice((page-1)*10,(page)*10)
                            .map((row)=>{

                                return (
                                    <TableRow
                                    onClick={()=>navigate(`/coins/${row.id}`)}
                                    className={classes.row}
                                    key={row.name}
                                    >
                                        <TableCell
                                        component="th"
                                        scope='row'
                                        style={{
                                            display:'flex',
                                            gap:15,
                                        }}
                                        >
                                            <img
                                            src={row?.image}
                                            alt={row.name}
                                            height='50'
                                            style={{marginBottom:10}}
                                            />
                                            <div style={{display:'flex',flexDirection:'column'}}>
                                                <span
                                                style={{
                                                    textTransform:'uppercase',
                                                    fontSize:22,
                                                    fontWeight:'bold',
                                                    color:'rgb(255 222 255)'
                                                }}
                                                >
                                                    {row.symbol}
                                                </span>
                                                <span style={{color:'darkgray'}}>{row.name}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell
                                        component="th"
                                        scope='row'
                                        style={{
                                            color:'lightgrey',
                                            textAlign:'center',
                                        }}
                                        >
                                            {displayPrice(row.current_price)}
                                        </TableCell>
                                        <TableCell
                                        component="th"
                                        scope='row'
                                        style={{
                                            color:'lightgrey',
                                            textAlign:'center',
                                        }}
                                        >
                                            {displayChange(row.price_change_percentage_24h)}
                                        </TableCell>
                                        <TableCell
                                        component="th"
                                        scope='row'
                                        style={{
                                            color:'gold',
                                            textAlign:'center',
                                        }}
                                        >
                                            {capi.symbol}{' '}{displayPrice(row.market_cap)}
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                )}
            </TableContainer>
            <Pagination 
            style={{
                padding:20,
                display:'flex',
                justifyContent:'center',
            }}
            classes={{ul:classes.pagination}}
            count={((handleSearch().length)/10).toFixed(0)}
            onChange={(_,value)=>{
                setpage(value);
                window.scroll({top:450,behavior:'smooth'});
                // window.scroll
            }}
            />
            </Container>
        </ThemeProvider>
    )
}