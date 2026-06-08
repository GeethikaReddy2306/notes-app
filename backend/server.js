const express=require('express');
const app=express();
const dns=require('dns');
const cors=require('cors');
const path=require('path');
require('dotenv').config();
const __dirname=path.resolve()
app.use(express.json());
app.use(cors({
        origin: process.env.Frontend
}));
if (process.env.NODE_ENV !== "production") {
  app.use(
    cors({
      origin: "http://localhost:5173",
    })
  );
}
dns.setServers(['1.1.1.1','8.8.8.8']);
const connectDb=require('./src/config/db');
const router=require('./src/routes/notes.routes');
app.use('/api/notes',router);
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(process.env.PORT,()=>{
        console.log("Server us running successfully");
})