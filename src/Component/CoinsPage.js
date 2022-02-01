import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Collapse, LinearProgress, makeStyles, Typography } from '@material-ui/core'
import axios from 'axios'
import { SingleCoin } from './gecko/geckoApi'
import { CoinInfo } from './CoinInfo'
import ExapndMore from '@material-ui/icons/ExpandMore'
import ExpandLess from '@material-ui/icons/ExpandLess'
import Context from './ContextApi/CreateContext'

const usestyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        [theme.breakpoints.down("sm")]: {
            alignItems: 'center',
            flexDirection: 'column',
        }
    },
    detail: {
        width: '30%',
        [theme.breakpoints.down('sm')]: {
            width: '95%',
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '25px',
        marginLeft: '20px',
        borderRight: '2px solid grey',
    },
    chartArea: {
        width: '65%',
        [theme.breakpoints.down('sm')]: {
            width: '95%'
        },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '25px',
    },
    heading: {
        fontFamily: 'Mochiy Pop One, sans-serif',
        marginBottom: '20px',
    },
    desc: {
        fontFamily: 'Irish Grover, cursive',
    }
}))

export const CoinsPage = () => {
    const { id } = useParams();
    console.log(id);
    const classes = usestyles()
    const [coin, setcoin] = useState()
    const [Open, setOpen] = useState(false)
    const capi = useContext(Context);

    const fetchData = async () => {
        const { data } = await axios.get(SingleCoin(id));
        console.log(data);
        setcoin(data);
    }

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleClick = () => {
        setOpen(!Open)
        console.log('clicked')
    }

    if (!coin) <LinearProgress color='primary' />

    console.log(coin);

    return (
        <div className={classes.container}>
            <div className={classes.detail}>
                <img
                    src={coin?.image.large}
                    alt={coin?.name}
                    height='200'
                    style={{ marginBottom: 10 }}
                />
                <Typography
                    variant='h5'
                    className={classes.heading}
                >
                    {coin?.name}
                </Typography>
                <div style={{ display: 'flex', }}>
                    <Typography
                        variant='h6'
                        style={{
                            fontFamily: 'Montserrat',
                            marginRight: '5px',
                            fontWeight: 'bold',
                            color: 'lightgrey'
                        }}
                    >
                        {'Rank :'}
                    </Typography>
                    <Typography
                        variant='h6'
                        style={{
                            fontFamily: 'Montserrat',
                            color: '#FF00FF'
                        }}
                    >
                        {coin?.coingecko_rank}
                    </Typography>
                </div>
                <div style={{ display: 'flex', }}>
                    <Typography
                        variant='h6'
                        style={{
                            fontFamily: 'Montserrat',
                            marginRight: '5px',
                            fontWeight: 'bold',
                            color: 'lightgrey'
                        }}
                    >
                        {'Current Price :'}
                    </Typography>
                    <Typography
                        variant='h6'
                        style={{
                            fontFamily: 'Montserrat',
                            color: '#FF00FF'
                        }}
                    >
                        {capi.symbol}{" "}{coin?.market_data.current_price[capi.currency.toLowerCase()]}
                    </Typography>
                </div>
                <div style={{ display: 'flex', }}>
                    <Typography
                        variant='h6'
                        style={{
                            fontFamily: 'Montserrat',
                            marginRight: '5px',
                            fontWeight: 'bold',
                            color: 'lightgrey'
                        }}
                    >
                        {'Market Cap :'}
                    </Typography>
                    <Typography
                        variant='h6'
                        style={{
                            fontFamily: 'Montserrat',
                            color: '#FF00FF'
                        }}
                    >
                        {capi.symbol}{" "}{coin?.market_data.market_cap[capi.currency.toLowerCase()]}
                    </Typography>
                </div>
                <div style={{
                    display: 'flex',
                }}
                >
                    <Button
                        variant='outlined'
                        style={{
                            color: 'white',
                            backgroundColor: 'purple',
                            fontWeight: 700,
                            margin:'20px',
                        }}
                        onClick={() => {
                        }}
                    >
                        Buy Now
                    </Button>
                    <Button
                        variant='outlined'
                        style={{
                            color: 'white',
                            backgroundColor: 'purple',
                            fontWeight: 700,
                            margin:'20px',
                        }}
                        onClick={() => {
                            console.log(coin.id);
                            capi.ConcatCoin(coin.id);
                            // alert('coin added')
                        }}
                    >
                        Add to Watchlist
                    </Button>
                </div>
                <Typography
                    className={classes.desc}
                    onClick={handleClick}
                >
                    <div dangerouslySetInnerHTML={{ __html: coin?.description.en.split('. ')[0] }} />
                    {Open ? <ExpandLess /> : <ExapndMore />}
                </Typography>
                <Collapse in={Open} timeout="auto" unmountOnExit>
                    <div style={{ color: '#AB50C7', fontSize: '1.2rem' }} dangerouslySetInnerHTML={{ __html: coin?.description.en.split('. ') }} />
                </Collapse>
            </div>
            <div className={classes.chartArea}>
                <CoinInfo coin={coin} />
            </div>
        </div>
    )
}




