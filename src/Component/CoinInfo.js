import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import Context from './ContextApi/CreateContext'
import { HistoricalChart } from './gecko/geckoApi'
import { CircularProgress, createTheme, ThemeProvider } from '@material-ui/core'
import 'chart.js/auto';
import { Line } from 'react-chartjs-2'
import { ChartButton } from './ChartButton'

export const CoinInfo = ({ coin }) => {

    const capi = useContext(Context)
    const [historical, sethistorical] = useState()
    const [unit, setunit] = useState(1)

    const fetchHistorical = async () => {
        const { data } = await axios.get(HistoricalChart(coin.id, unit, capi.currency))
        sethistorical(data);
    }

    // fetchHistorical();

    useEffect(() => {
        fetchHistorical();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [capi.currency,unit])

    window.setTimeout(() => {
        if(!historical)
        fetchHistorical();
    }, 1000);

    console.log('the historical data is', historical);

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            },
            type: 'dark'
        },
    })

    return (
        <ThemeProvider theme={darkTheme}>
            {!historical ? (
                <CircularProgress
                    style={{ color: 'gold' }}
                    size={250}
                    thickness={2} />
            ) : (
                <div style={{
                        height: '100%',
                        width: '100%',
                        marginLeft:'20px'
                }}>
                    <Line
                    data={{
                        labels: historical.prices.map((coin) => {
                            let date = new Date(coin[0]);
                            let time =
                                date.getHours() > 12 ?
                                    `${date.getHours() - 12}:${date.getMinutes()} PM` :
                                    `${date.getHours()}:${date.getMinutes()} AM`
                            return unit === 1 ? time : date.toLocaleString()
                            // return date
                        }),

                        datasets: [{
                            data: historical.prices.map((coin) => coin[1]),
                            label: `Price ( Past ${unit} Days ) in ${capi.currency}`,
                            borderColor:'gold',
                            // backgroundColor:'gold',
                        }]
                    }}
                    options={{
                        elements: {
                            point: {
                                radius: 1,
                            }
                        },
                    }}
                    />
                    <ChartButton unit={unit} setunit={setunit}/>
                </div>
            )}
        </ThemeProvider>
    )
}