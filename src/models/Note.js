const {Schema, model} = require('mongoose');

const NoteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }    
}, {
    timestamps: true  //me indicará cuando fue creado y actualizado //propiedad de mongoose
})

module.exports = model('Note', NoteSchema);