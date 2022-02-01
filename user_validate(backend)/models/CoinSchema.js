const mongoose=require('mongoose');
const {Schema} =mongoose;

const CoinSchema=new Schema({
    user:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    }
});

const Coin=mongoose.model('portfolio',CoinSchema);
module.exports=Coin;