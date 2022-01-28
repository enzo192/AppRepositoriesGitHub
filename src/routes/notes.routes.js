const { Router } = require('express');
const router = Router();

const { renderNoteForm, 
    createNewNote, 
    renderNotes, 
    renderEditForm, 
    updateNote, 
    deleteNote 
} = require('../controllers/notes.controller');

//new note
router.get('/notes/add', renderNoteForm);

router.post('/notes/new-note', createNewNote);

//get all notes
router.get('/notes', renderNotes);

//update or edit note
router.get('/notes/edit/:id', renderEditForm);

router.put('/notes/edit-note/:id', updateNote);

//Delete Notes

router.delete('/notes/delete/:id', deleteNote);


module.exports = router;