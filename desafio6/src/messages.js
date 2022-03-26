const fs = require('fs');

class Messages {
	constructor(fileName) {
		this.fileName = fileName;
	}

	async save(message) {
		try {
			let messages = await this.getAll();
			messages.push(message);
			await fs.promises.writeFile(this.fileName, JSON.stringify(messages));
			return true;
		} catch (err) {
			console.log('Error al guardar mensaje', err);
			return false;
		}
	}

	async getAll() {
		try {
			const content = await fs.promises.readFile(this.fileName, 'utf-8');
			const jsonObject = JSON.parse(content);
			return jsonObject;
		} catch (err) {
			console.log('Error al leer el archivo', err);
		}
	}	
}

module.exports = Messages;
