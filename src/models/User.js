const {Schema, model} = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new Schema({
    name: { type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},    
}, {
    timestamps: true  //me indicará cuando fue creado y actualizado //propiedad de mongoose
})

//encriptar contraseña
UserSchema.methods.encryptPassword = async password => { 
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

//validar contraseña con un nuevo login, compara la guardada en DB con la que ingresa el user
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};



module.exports = model('User', UserSchema);