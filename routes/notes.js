const express = require('express')
const router = express.Router()
const Note = require('../models/Notes')


//get all notes

router.get('/', async (req, res) => {
    try {
        const notes = await Note.find();
        res.json(notes);
    } catch {
        res.status(500).json({ message: err.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });
        res.json(note);
    } catch {
        res.status(500).json({ message: err.message });
    }
})


router.post('/', async (req, res) => {
    const note = new Note({
        title: req.body.title,
        content: req.body.content
    })
    try {
        const newNote = await note.save();
        res.status(201).json(newNote)
    } catch (error) {
        res.status(400).json({ messgae: error.message })

    }
})

router.put('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: 'Note not found' });

        if (req.body.title)
            note.title = req.body.title;
        if (req.body.content)
            note.content = req.body.content
        const updateNote = await note.save();
        res.json(updateNote);
    } catch (error) {
        res.status(500).json({ messgae: error.message })
    }
})



router.delete('/:id', async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note)
            return res.status(404).json({ message: "Note not found" });

        await note.deleteOne();
        res.json({ message: "Note deleted succesfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;