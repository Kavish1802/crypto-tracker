const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');

connectToMongo();
const app = express();
const port = 8000

app.use(cors());
app.use(express.json());

app.use('/Cryptoapi/auth', require('./routes/auth'));

// app.get('/',(req,res)=>{
//     try{
//         res.send('hello rishav');
//     }
//     catch(error)
//     {
//         res.send('get error');
//     }
// })

// app.post('/',(req,res)=>{
//     try{
//         res.send('post world');
//     }
//     catch(error){
//         res.send('post error');
//     }
// })

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`)
})