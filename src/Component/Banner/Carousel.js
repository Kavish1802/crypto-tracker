import { makeStyles } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel'
import { Link } from 'react-router-dom'
import Context from '../ContextApi/CreateContext'
import { TrendingCoins } from '../gecko/geckoApi'
import { PercentOutlined } from '@mui/icons-material';

const Carousel = () => {

    // var str='hellj world';
    // var sub=str.substr(1,4);
    // console.log(sub);

    const useStyle = makeStyles((theme) => ({
        carousel: {
            height: "50%",
            display: "flex",
            alignItems: "center",
        },
        carouselItem: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
            textTransform: "uppercase",
            color: "white",
        },
        cryptoName: {
            fontFamily: 'Mochiy Pop One, sans-serif',
            color: '#A1ABAB',
        },
        cryptoPrice: {
            color: '#EBC000',
            fontSize: '30px'
        },
        priceSymbol: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        cryptoSymbol: {
            color: '#EBC000',
            fontSize: '20px',
            marginRight: '5px'
        },
        pos: {
            color: '#6AE324'
        },
        neg: {
            color: '#E64239'
        },
        percent: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        percentvalue: {
            fontSize: "25px",
        },
        percentsymbol: {
            marginLeft: '5px',
            fontSize: "15px",
        },
        downsize: {
            fontSize: 'small'
        },
        display: {
            display: 'flex',
            flexDirection: 'row',
        }
    }))

    const [trending, settrending] = useState([])
    const classes = useStyle()
    const capi = useContext(Context)

    console.log(capi.symbol);

    const fetchTrendingCoins = async () => {
        const { data } = await axios.get(TrendingCoins(capi.currency))
        settrending(data)
        console.log(trending)
    }

    useEffect(() => {
        fetchTrendingCoins();
        // eslint-disable-next-line
    }, [capi.currency])

    const responsive = {
        0: {
            items: 2,
        },
        512: {
            items: 4,
        }
    }

    const PricePercentage = (val) => {
        var str = val.toString(10);
        // console.log(str);
        // var sub = str.substr(1, 4);
        // console.log(`${val}-${typeof str}`);
        // console.log(str.charAt(0));
        // console.log((val.charAt(0)));
        // console.log(val.substring(0,2));
        // val.replaceAt(0,'a')
        if (str.charAt(0) === '-') {
            return (
                <div className={`${classes.percent} ${classes.neg}`}>
                    <div className={classes.percentvalue}>
                        {val}
                    </div>
                    <div className={classes.downsize}>
                        <PercentOutlined />
                    </div>
                </div>
            )
        }
        return (
            <div className={`${classes.percent} ${classes.pos}`}>
                <div className={classes.percentvalue}>
                    {val}
                </div>
                <div className={classes.downsize}>
                    <PercentOutlined />
                </div>
            </div>
        )
    }

    const displayPrice=(x)=>{
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const items = trending.map((coin) => {
        console.log(coin)
        return (
            <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
                <div className={classes.display}>
                    <img
                        src={coin?.image}
                        alt={coin.name}
                        height="80"
                        style={{ marginBottom: 10 }}
                    />
                    <div style={{ marginLeft:'3px'}}>
                        {coin.symbol}
                    </div>
                </div>
                <div className={classes.cryptoName}>
                    {coin.name}
                </div>
                <div className={classes.priceSymbol}>
                    <div className={classes.cryptoSymbol}>
                        {capi.symbol}
                    </div>
                    <div className={classes.cryptoPrice}>
                        {displayPrice(coin.current_price)}
                    </div>
                </div>
                <div>
                    {PricePercentage(coin.price_change_percentage_24h)}
                </div>
            </Link>)
    })

    return (
        <div className={classes.carousel}>

            <AliceCarousel
                mouseTracking
                autoPlayInterval={1000}
                animationDuration={1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
                infinite
            />
        </div>
    )
}

export default Carousel