const express=require('express');

const router=express.Router();
const {postNotes,getNotes,deleteNotes, getNotesbyId,updateNotes} = require('../controllers/notes.controller');
router.post('/',postNotes);
router.get('/',getNotes);
router.delete('/:id',deleteNotes);
router.put('/:id',updateNotes);
router.get('/:id',getNotesbyId);
module.exports=router;