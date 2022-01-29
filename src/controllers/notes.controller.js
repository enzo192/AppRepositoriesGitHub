const notesCtrl = {};

const { send } = require('express/lib/response');
const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note')
};

notesCtrl.createNewNote = async (req, res) => {
    const {title, description} = req.body; //saca el titulo y descripcion que envio en el body del form
    const newNote = new Note({title: title, description: description}); //vinculo variables en las de la base de dato que defini en modelos

    newNote.user = req.user.id;   //esto es para que tambien me guarde el usuario de quien creo la nota !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!IMPORTANTE

    await newNote.save(); //se guarda en la base de datos mongodb
    req.flash('success_msg', 'Note Added Successfully'); //mostrarle al usuario un mensaje indicando que se creó correctamente
    res.redirect('/notes'); //recarga la pagina para ver el cambio y que la nota desapareció
};

notesCtrl.renderNotes = async (req, res) => {
   //const notes  = await Note.find().lean(); // va a buscar TODO lo que tengo guardado en la bd Note y guardarlo en const notes

   const notes  = await Note.find({user: req.user.id}).sort({createdAt: 'desc'}).lean();  // va a buscar las notas guardadas y mostrara solo las que tengan el mismo id del usuario logeado!!!!!!!!!!
    //y sort para ordenar de la mas nueva a la mas antigua

   res.render('notes/all-notes', { notes }); // va a renderizar la pagina all-notes y en ella pondrá el objeto notes con su contenido
};

notesCtrl.renderEditForm = async (req, res) => {
    const note = await Note.findById(req.params.id).lean(); //consulto en la dbs la info de la nota con el ID que me llega

    if (note.user != req.user.id) {                //esto es para que otro usuario no pueda editar la nota de otro usuario si logra tener la ruta de esa nota
        req.flash('error_msg', 'Not Authorized');
        return res.redirect('/notes');
    }

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