import { Card, CircularProgress, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from './ContextApi/CreateContext';
import { SingleCoin } from './gecko/geckoApi';
import DeleteIcon from '@mui/icons-material/Delete';

const useclass = makeStyles((theme) => ({
    container: {
        width: '100%',
        // border: '2px solid red',
        // backdropFilter: 'blur(1px) brightness(40%)',
    },
    card: {
        height: '200px',
        // aspectRatio:'1/1',
        width:'150px',
        margin: '10px',
        padding:'5px',
        backgroundColor: '#303333',
        background: 'transparent',
        color: 'white',
        borderRadius:'10px',
        boxShadow:'5px 5px 10px #555e5e',
        cursor:'pointer',
        // backdropFilter: 'blur(5px) brightness(40%)',
    },
    image: {
        filter: 'brightness(100%)',
        height: '80px',
        margin:'5px',
        // border:'2px solid red'
    },
    page: {
        display: "flex",
    }
}))

export const WatchListContent = (props) => {
    const classes = useclass();
    const [coin, setcoin] = useState([]);
    const capi = useContext(Context);
    const navigate=useNavigate()
    // const [historical, sethistorical] = useState([]);

    const fetchCoin = async () => {
        let { data } = await axios.get(SingleCoin(props.data.name));
        setcoin(data);
    }

    // const fetchHistorical = async () => {
    //     let { data } = await axios.get(HistoricalChart(coin.id, 1, capi.currency.toLowerCase()));
    //     sethistorical(data);
    // }

    useEffect(() => {
        fetchCoin();
        // fetchHistorical();
    }, []);

    const number = (x) => {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // if (coin.length === 0) {
    //     <CircularProgress
    //         style={{
    //             color: 'gold'
    //         }}
    //         size={200}
    //         thickness={2}
    //     />
    // }

    // console.log(historical);

    return (
        <>
            {coin.length !== 0 ? (
                <>
                    <Card
                        sx={{ minWidth: 200 }}
                        className={classes.card}
                        onClick={()=>navigate(`/coins/${coin.id}`)}
                    >
                        
                            <DeleteIcon
                            style={{
                                position:'fixed',
                            }}
                            onClick={(e)=>{
                                e.preventDefault();
                                capi.DeleteCoin(coin.id)
                            }
                            }
                            />
                        <div style={{
                            height:'100%',
                            width:'100%',
                            padding:'5px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            // border:'2px solid red',
                            // width:'100%',
                        }}>
                            <img
                                src={coin?.image.large}
                                alt={coin.name}
                                // height='80'
                                className={classes.image}
                            />
                            <Typography
                                variant='outlined'
                                style={{
                                    color: 'white',
                                    fontSize: '1.2rem',
                                    fontFamily: 'Supermercado One, cursive'
                                }}
                            >
                                {coin.name}
                            </Typography>
                            <Typography
                                variant='outlined'
                                style={{
                                    color: 'gold',
                                    fontSize: '1.2rem',
                                    fontFamily: 'Supermercado One, cursive'
                                }}
                            >
                                {capi.symbol}
                                {' '}
                                {number(coin.market_data.current_price[capi.currency.toLowerCase()])}
                            </Typography>
                        </div>  
                    </Card>
                </>
            ) : (
                <>
                    <CircularProgress
                        style={{
                            color: 'gold'
                        }}
                        size={150}
                        thickness={2}
                    />
                </>
            )}
        </>
    );
};
