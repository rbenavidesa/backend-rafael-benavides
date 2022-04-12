import * as fs from 'fs';

class CartContainer {
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
			const carts = JSON.parse(content);

			for (let obj of carts) {
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

	async create() {
		try {
			let cart = {};
			if (this.lastId == null) {
				cart.id = 1;
				this.lastId = 1;
			} else {
				cart.id = ++this.lastId;
			}

			cart.timestamp = new Date().toLocaleString('es-CL');
			cart.products = [];
			let carts = await this.getAll();
			carts.push(cart);
			await fs.promises.writeFile(this.fileName, JSON.stringify(carts));

			return this.lastId;
		} catch (err) {
			console.log('Error al guardar producto', err);
			return false;
		}
	}

	async saveProduct(cartId, product) {
		try {
			let newCarts = [];
			let cartUpdated = false;
			const carts = await this.getAll();

			carts.forEach(function (obj) {
				if (parseInt(obj.id) == cartId) {
					cartUpdated = true;
					obj.timestamp = new Date().toLocaleString('es-CL');
					obj.products.push(product);
				}

				newCarts.push(obj);
			});

			if (cartUpdated) {
				await fs.promises.writeFile(this.fileName, JSON.stringify(newCarts));
				return true;
			} else {
				console.log('Id no encontrado. El producto no se le agregó a ningún carrito');
				return false;
			}
		} catch (err) {
			console.log('Error al agregar un producto a un carrito', err);
			return false;
		}
	}

	async getById(id) {
		try {
			let cart = false;
			const carts = await this.getAll();

			for (let obj of carts) {
				if (parseInt(obj.id) == id) {
					cart = obj;
					break;
				}
			}

			return cart.products;
		} catch (err) {
			console.log('Error al buscar producto por ID', err);
		}
	}

	async getAll() {
		try {
			const carts = await fs.promises.readFile(this.fileName, 'utf-8');
			const jsonObject = JSON.parse(carts);

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

	async deleteCartById(id) {
		try {
			let newCarts = [];
			let cartDeleted = false;
			const carts = await this.getAll();

			carts.forEach(function (obj) {
				if (parseInt(obj.id) == id) {
					cartDeleted = true;
				} else {
					newCarts.push(obj);
				}
			});

			if (cartDeleted) {
				await fs.promises.writeFile(this.fileName, JSON.stringify(newCarts));
				return true;
			} else {
				console.log('Id no encontrado. Ningún carrito fue eliminado');
				return false;
			}
		} catch (err) {
			console.log('Error al borrar por ID', err);
			return false;
		}
	}

	async deleteProductById(cartId, productId) {
		try {
			let newCarts = [];
			let cartFound = false;
			const carts = await this.getAll();
			let result = {};

			carts.forEach(function (obj) {
				if (parseInt(obj.id) == cartId) {
					cartFound = true;
					/* ----------------------------------- sub ---------------------------------- */

					let productDeleted = false;
					let newProducts = [];

					obj.products.forEach(function (obj2) {
						if (parseInt(obj2.id) == productId) {
							productDeleted = true;
						} else {
							newProducts.push(obj2);
						}
					});

					if (productDeleted) {
						result.products = newProducts;
						result.success = true;
					} else {
						console.log('Id no encontrado. Ningún producto fue eliminado del carrito');
						result.products = obj.products;
						result.success = false;
					}

					/* ----------------------------------- sub ---------------------------------- */

					obj.products = result.products;
					newCarts.push(obj);
				} else {
					newCarts.push(obj);
				}
			});

			if (cartFound && result.success) {
				await fs.promises.writeFile(this.fileName, JSON.stringify(newCarts));
				return true;
			} else {
				console.log('La combinación ID y ID_PROD no fue encontrada. Ningún producto fue eliminado');
				return false;
			}
		} catch (err) {
			console.log('Error al borrar producto por ID', err);
			return false;
		}
	}
}

export default CartContainer;
