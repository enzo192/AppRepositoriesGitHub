const notesCtrl = {};

const { send } = require('express/lib/response');
const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
};

notesCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body; //saca el titulo y descripcion que envio en el body del form
    const newNote = new Note({title: title, description: description}); //vinculo variables en las de la base de dato que defini en modelos
    await newNote.save(); //se guarda en la base de datos mongodb
    req.flash('success_msg', 'Note Added Successfully'); //mostrarle al usuario un mensaje indicando que se creó correctamente
    res.redirect('/notes'); //recarga la pagina para ver el cambio y que la nota desapareció
};

notesCtrl.renderNotes = async (req, res) => {
   const notes  = await Note.find().lean(); // va a buscar todo lo que tengo guardado en la bd Note y guardarlo en const notes
   res.render('notes/all-notes', { notes }); // va a renderizar la pagina all-notes y en ella pondrá el objeto notes con su contenido
};

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean(); //consulto en la dbs la info de la nota con el ID que me llega
    res.render('notes/edit-notes',{ note }); //envio la info de la nota a la vista
};

notesCtrl.updateNote = async (req, res) => {
    const {title, description} = req.body; //pido el body y los guardo en esas constantes
    await Note.findByIdAndUpdate(req.params.id, {title: title, description: description}); //actualiza con la info nueva que mando
    req.flash('success_msg', 'Note Updated Successfully');
    res.redirect('/notes');
};

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id); // estrae el id que estoy enviando y elimina la nota con ese id
    req.flash('success_msg', 'Note Deleted Successfully');
    res.redirect('/notes'); //recarga la pagina para ver el cambio y que la nota desapareció
};

module.exports = notesCtrl;