
import Note from "../models/Note.js";
import note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createNote(req, res) {
  try{
    const {title,content} = req.body;
    const newNote = new Note({title:title,content:content})
    const savednote = await newNote.save()
    res.status(201).json(savednote)
  }
  catch(error){
    console.error("Error in creating note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateNote(req, res) {
  try{
    const {title,content} = req.body;
    const updatednote = await Note.findByIdAndUpdate(req.params.id,{title: title,content: content})

    if(!updatednote){
      return res.status(404).json({message:"No note with this ID"})
    }
    res.status(200).json(updatednote);

  }
  catch(error){
    console.error("Error in updating note", error);
     res.status(500).json({ message: "Internal server error" });
  }
}
export async function deleteNote(req, res) {
  try {
    const deletednote = await Note.findByIdAndDelete(req.params.id)
    if(!deletednote){
      return res.status(404).json({message:"No note with this ID"})
    }
    res.status(200).json({message:"Note deleted"});
  }
  catch(error){
    console.error("Error in deleting note", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
export async function getNoteById(req, res) {
  try{
    const note = await Note.findById(req.params.id)
    if(!note){
      return res.status(404).json({message:"No note with this ID"})
    }
    res.status(200).json(note);
  }
  catch(error){
    console.error("Error in getNoteById", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


