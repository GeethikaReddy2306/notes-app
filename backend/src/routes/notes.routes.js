const express=require('express');

const router=express.Router();
const getAllNotes=require('../controllers/notes.controller');
router.get('/',getAllNotes);
router.post('/',(req,res)=>{
        res.send("route is posted successfully");
})

module.exports=router;