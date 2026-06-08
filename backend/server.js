const express=require('express');
const app=express();
const dns=require('dns');
const cors=require('cors');
//middleware
app.use(express.json());
app.use(cors({
        origin: process.env.Frontend
}));
dns.setServers(['1.1.1.1','8.8.8.8']);
const connectDb=require('./src/config/db');
const router=require('./src/routes/notes.routes');
app.use('/api/notes',router);

app.listen(process.env.PORT,()=>{
        console.log("Server us running successfully");
})