const express=require('express');

const router=express.Router();
const postNotes = require('../controllers/notes.controller');
router.post('/',postNotes);

module.exports=router;