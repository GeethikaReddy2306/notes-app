const notes=require('../models/note');
async function postNotes(req,res) {
        const data=req.body;
        notes.insertOne({
                title:data.title,
                content:data.content
}).res.json(201,{
        message:"data posted successfully",
        data:data
})
        


        
} 
module.exports=postNotes;