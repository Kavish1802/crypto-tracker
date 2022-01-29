const mongoose=require('mongoose');
const mongooseURI="mongodb://localhost:27017/user_validate?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connectToMongo=()=>{
    mongoose.connect(mongooseURI,()=>{
        console.log('connected to mongo');
    })
}

module.exports=connectToMongo;