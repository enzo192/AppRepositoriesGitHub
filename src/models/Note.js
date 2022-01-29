const {Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    user: {                     //este requisito es para que las notas sean privadas de cada usuario, si lo quito serían globales
        type: String,
        required: true
    } 
}, {
    timestamps: true  //me indicará cuando fue creado y actualizado //propiedad de mongoose
})

module.exports = model('Note', NoteSchema);