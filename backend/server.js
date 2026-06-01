const express=require('express');
const app=express();

const router=require('./src/routes/notes.routes');
app.use('/api/notes',router);
app.listen(3000,()=>{
        console.log("Server us running successfully");
})