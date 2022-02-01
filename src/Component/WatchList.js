import { CircularProgress, makeStyles, Typography, Button } from '@material-ui/core'
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Context from './ContextApi/CreateContext';
import { WatchListContent } from './WatchListContent';

const useClass = makeStyles((theme) => ({
    cbefore:{
        backgroundImage: 'url(https://entrepreneurhandbook.co.uk/wp-content/uploads/2018/07/Bitcoin.jpg.webp)',
        backgroundSize: 'cover',
    },
    container: {
        // height: "100vh",
        minHeight:'100vh',
        width: "100%",
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        
        backdropFilter:'brightness(50%)',
        // border:'2px solid red',
    },
    heading: {
        fontStyle: 'bold',
        fontFamily: 'Supermercado One, cursive',
        fontSize: '2.3rem',
        color:'gold',
        // marginTop:'80px'
    }
}))

export const WatchList = () => {

    const classes = useClass();
    const { watchdata,ExtractWatchList} = useContext(Context)
    const navigate=useNavigate();

    useEffect(() => {
        console.log('inside extract');
        ExtractWatchList();
        
        // eslint-disable-next-line
    }, []);

    
    console.log(watchdata)

    return (
        <div className={classes.cbefore}>
        <div className={classes.container}>

            <div className={classes.heading}>
                My WatchList
            </div>


            {watchdata.length === 0 ? (
                    <div style={{
                        display: 'flex',
                        flexDirection:'column',
                        justifyContent:'center',
                        width: '100%',
                        // border:'2px solid red',
                        alignItems:'center',
                    }}>
                        <div style={{margin:'20px'}}>
                            <Typography
                            variant="outlined"
                            style={{
                                color:'#D2B4DB',
                                fontSize:'2rem',
                            }}
                            >
                                Your WatchList is Empty
                            </Typography>
                        </div>
                        <div
                        style={{
                            display:'flex',
                            width:'100%',
                            justifyContent:'space-around',
                        }}
                        >
                        <CircularProgress
                            style={{ color: 'purple' }}
                            size={150}
                            thickness={2} />
                        <CircularProgress
                            style={{ color: '#A872CC' }}
                            size={150}
                            thickness={2} />
                        <CircularProgress
                            style={{ color: '#D2B4DB' }}
                            size={150}
                            thickness={2} />
                        </div>
                        <div
                        style={{
                            margin:'20px',
                        }}
                        >
                            <Button
                            variant="outlined"
                            style={{
                                color:'white',
                                backgroundColor:'purple',
                                fontStyle:'bold',
                            }}
                            onClick={()=>{
                                navigate('/');
                            }}
                            >
                                Explore Market
                            </Button>
                        </div>
                    </div>
            ) : (
                <div style={{height:'100%',width:'90%',marginTop:'40px',
                            // border:'2px solid red',
                            display:'flex',flexDirection:'row',
                            justifyContent:'space-between',
                            flexWrap:'wrap',
                            }}>
                    {
                        watchdata.map((data)=>{
                            return <WatchListContent data={data}/>
                        })
                    }
                </div>
            )}
        </div>
        </div>
    )
}