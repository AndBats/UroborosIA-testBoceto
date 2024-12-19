const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento con multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Controlador para procesar el archivo cargado
router.post('/', upload.single('trainingFile'), (req, res) => {
    if (req.file) {
        res.send('Archivo cargado exitosamente para entrenamiento.');
    } else {
        res.status(400).send('Error en la carga del archivo.');
    }
});

module.exports = router;
