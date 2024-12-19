const nlp = require('nlp.js');

class Uroboros {
  constructor() {
    this.manager = new nlp.NlpManager({ languages: ['en'], forceNER: true });
  }

  async process(input) {
    const response = await this.manager.process('en', input);
    return response;
  }

  async train(data) {
    data.forEach(item => {
      this.manager.addDocument(item.language, item.input, item.intent);
      this.manager.addAnswer(item.language, item.intent, item.answer);
    });
    await this.manager.train();
    this.manager.save();
  }
}

module.exports = new Uroboros();
