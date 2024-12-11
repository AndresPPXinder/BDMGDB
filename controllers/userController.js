
const User = require('../models/user');

// Mostrar todos los usuarios index


// Mostrar todos los usuarios index y buscar por nombre
exports.index = async (req, res) => {
    try {
        const { nombre } = req.query; // Captura el término de búsqueda desde el query string
        const users = nombre 
            ? await User.find({ name: new RegExp(nombre, 'i') }) // Busca por nombre si hay término
            : await User.find(); // Devuelve todos los usuarios si no hay término

        res.render('index', { users, nombre: nombre || '' }); // Renderiza la vista con los usuarios y el término
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener los usuarios');
    }
};


// Buscar un usuario por nombre
exports.buscar = async (req, res) => {
    try {
        const { nombre } = req.query; // Captura el término de búsqueda desde el query string
        const usuarios = await User.find({ name: new RegExp(nombre, 'i') }); // Busca por nombre

        res.render('index', { users: usuarios, nombre }); // Renderiza la vista con los usuarios y el término
    } catch (error) {
        res.status(500).send('Error al buscar los usuarios');
    }
};

// Otros métodos del controlador...
exports.create = async (req, res) => {
    const user = null;
    res.render('create', { user });
};

exports.store = async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.edit = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.render('create', { user });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.update = async (req, res) => {
    const { name, email, age } = req.body;
    try {
        await User.findByIdAndUpdate(req.params.id, { name, email, age });
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.delete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.redirect('/');
    } catch (error) {
        res.status(500).send(error);
    }
};
