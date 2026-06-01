const mongoose=require('mongoose');
require('dotenv').config();
async function connectDb(){
        await mongoose.connect(process.env.MONGO_URL);
}
connectDb().then((res)=>{console.log("db is connected")})
.catch((err)=>console.log(err));
module.exports=connectDb;
