const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

// Asegura que exista la carpeta 'uploads'
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Configuración de multer
const storage = multer.diskStorage({
    destination: uploadsDir,
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024 }, // Aumenta límite de archivo a 20 MB
}).single('archivo');

// Ruta para manejar la subida de archivos
app.post('/upload', (req, res) => {
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // Error de multer
            return res.status(400).send(`Error en la carga del archivo: ${err.message}`);
        } else if (err) {
            // Otro tipo de error
            return res.status(500).send(`Error en el servidor: ${err.message}`);
        }
        if (!req.file) {
            return res.status(400).send('No se ha subido ningún archivo');
        }
        res.send(`Archivo ${req.file.originalname} subido exitosamente`);
    });
});

// Sirve el archivo HTML
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
