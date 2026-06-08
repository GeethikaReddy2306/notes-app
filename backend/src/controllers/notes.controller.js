const notes=require('../models/note');
async function postNotes(req,res) {
       try{
      const data=req.body;
      const result=await notes.insertOne({
        title:data.title,
        content:data.content
      })
      res.status(201).json({
        message:"data sent successfully",
        data:data
      })
       }catch(err){
        console.log(err);

      res.status(500).json({ message: "Internal server error" });
       }
}
async function getNotes(req,res) {
  try{
      const result= await notes.find().sort({ createdAt: -1 });
      res.status(200).json({
        message:"Data fetched",
        result:result
        
      })
    }catch(err){
        console.log(err);
     res.status(500).json({ message: "Internal server error" });
    }
}
async function getNotesbyId(req,res){
  try{
     const note = await notes.findById(req.params.id);
     if (!note) return res.status(404).json({ message: "Note not found!" });
     res.json(note);
  }catch(err){
    console.log(err);
    res.status(500).json({ message: "Internal server error" });

  }
}
async function deleteNotes(req, res) {
  try {
    const { id } = req.params;

    const deletedNote = await notes.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({
        message: "Note not found",
      });
    }

    res.status(200).json({
      message: "Deleted successfully",
      data: deletedNote,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function updateNotes(req, res) {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const updatedNote = await notes.findByIdAndUpdate(
      id,
      {
        title,
        content
      },
      {
        new: true, // returns updated document
        runValidators: true // runs schema validations
      }
    );

    // Check if note exists
    if (!updatedNote) {
      return res.status(404).json({
        message: "Note not found"
      });
    }

    res.status(200).json({
      message: "Note updated successfully",
      data: updatedNote
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Internal server error"
    });
  }
}
        
 
module.exports={postNotes,getNotes,deleteNotes,updateNotes,getNotesbyId};