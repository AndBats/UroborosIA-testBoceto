const Uroboros = require('../models/uroborosModel');
const FileHandler = require('../utils/fileHandler');

exports.processInput = async (req, res) => {
  try {
    const input = req.body.userInput; // Recibe el input desde el HTML
    const result = await Uroboros.process(input); // Procesa en Uroboros

    res.json({ result });
  } catch (error) {
    res.status(500).json({ message: "Error processing input", error });
  }
};

exports.loadTrainingFile = (req, res) => {
  const { filePath } = req.body;
  FileHandler.loadFile(filePath)
    .then(data => Uroboros.train(data))
    .then(response => res.json({ message: "Training successful", response }))
    .catch(err => res.status(500).json({ message: "Error loading file", err }));
};
