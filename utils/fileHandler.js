const fs = require('fs').promises;

exports.loadFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    throw new Error('File loading failed');
  }
};
