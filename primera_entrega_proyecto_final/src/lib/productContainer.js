const fs = require('fs');

class ProductContainer {
	constructor(fileName) {
		this.fileName = fileName;
		this.lastId = null;
	}

	async init() {
		// Esta función intenta leer el archivo para verificar su existencia, si no puede leerlo crea un archivo con un arreglo de objetos vacío y setea el último id inicialmente agregado
		try {
			const content = await fs.promises.readFile(this.fileName, 'utf-8');
			this.lastId = await this.getInitialLastId(content);
		} catch (err) {
			// Si no existe lo creo con un arreglo de objetos vacío
			await fs.promises.writeFile(this.fileName, '[]');
			this.lastId = null;
		}
	}

	getInitialLastId(content) {
		try {
			let lastId = null;
			const products = JSON.parse(content);

			for (let obj of products) {
				if (lastId == null) {
					lastId = obj.id;
				}
				if (obj.id > lastId) {
					lastId = obj.id;
				}
			}

			return lastId;
		} catch (err) {
			console.log('Error al buscar el último id agregado', err);
		}
	}

	async save(product) {
		try {
			if (this.lastId == null) {
				product.id = 1;
				this.lastId = 1;
			} else {
				product.id = ++this.lastId;
			}

			let products = await this.getAll();
			products.push(product);
			await fs.promises.writeFile(this.fileName, JSON.stringify(products));

			return this.lastId;
		} catch (err) {
			console.log('Error al guardar producto', err);
			return false;
		}
	}

	async getById(id) {
		try {
			let product = null;
			const productos = await this.getAll();

			for (let obj of productos) {
				if (parseInt(obj.id) == id) {
					product = obj;
					break;
				}
			}

			return product;
		} catch (err) {
			console.log('Error al buscar carrito por ID', err);
		}
	}

	async getAll() {
		try {
			const products = await fs.promises.readFile(this.fileName, 'utf-8');
			const jsonObject = JSON.parse(products);

			return jsonObject;
		} catch (err) {
			console.log('Error al leer el archivo', err);
		}
	}

	async updateById(id, product) {
		try {
			let productUpdated = false;
			const products = await this.getAll();

			products.forEach(function (obj, index, products) {
				if (parseInt(obj.id) == id) {
					productUpdated = true;
					products[index] = product;
				}
			});

			if (productUpdated) {
				await fs.promises.writeFile(this.fileName, JSON.stringify(products));
				return true;
			} else {
				console.log('Id no encontrado. Ningún producto fue actualizado');
				return false;
			}
		} catch (err) {
			console.log('Error al actualizar por ID', err);
			return false;
		}
	}

	async deleteById(id) {
		try {
			let newProducts = [];
			let productDeleted = false;
			const products = await this.getAll();

			products.forEach(function (obj) {
				if (parseInt(obj.id) == id) {
					productDeleted = true;
				} else {
					newProducts.push(obj);
				}
			});

			if (productDeleted) {
				await fs.promises.writeFile(this.fileName, JSON.stringify(newProducts));
				return true;
			} else {
				console.log('Id no encontrado. Ningún producto fue eliminado');
				return false;
			}
		} catch (err) {
			console.log('Error al borrar por ID', err);
			return false;
		}
	}

	async deleteAll() {
		try {
			await fs.promises.writeFile(this.fileName, '[]');
		} catch (err) {
			console.log('Error al sobreescribir el archivo', err);
		}
	}
}

module.exports = ProductContainer;
