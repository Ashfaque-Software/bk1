const express = require("express");
const { NoteModel } = require("../models/noteModel"); // Import NoteModel correctly
const {auth}=require("../middleware/auth.middleware")

const noteRouter = express.Router();

noteRouter.post("/create",auth, async (req, res) => {
    try {
        const note = new NoteModel(req.body);
        await note.save();
        res.send({ "msg": "A note has been created" });
    } catch (error) {
        res.send({ "error": error });
    }
});

// Read all the notes
noteRouter.get("/",auth, async (req, res) => {
    try {
        const notes = await NoteModel.find();
        res.send(notes);
    } catch (error) {
        res.send({ "error": error });
    }
});

// Update notes
noteRouter.patch("/update/:noteId",auth, async (req, res) => {
    const { noteId } = req.params;
    try {
         await NoteModel.findByIdAndUpdate(noteId, req.body);

        res.send(`Note has been updated with the id: ${noteId}`);
    } catch (error) {
        res.send({"error":error})
    }
});

//delete
noteRouter.delete("/delete/:noteId",auth, async (req, res) => {
    const { noteId } = req.params;
    try {
         await NoteModel.findByIdAndDelete(noteId, req.body);

        res.send(`Note has been deleted with the id: ${noteId}`);
    } catch (error) {
        res.send({"error":error})
    }
});


module.exports = {
    noteRouter
};
