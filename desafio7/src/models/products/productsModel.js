// import { knex } from './db.js';
import { config } from './config.js';
import _knex from 'knex';
let knex;

export const getAllProducts = async () => {
	try {
		knex = _knex(config);
		const products = await knex.select().from('products');
		return products;
	} catch (error) {
		console.log(error);
	} finally {
		knex.destroy();
	}
};

export const getProductById = async (productId) => {
	try {
		knex = _knex(config);
		const product = await knex.select().from('products').where('id', '=', parseInt(productId));
		return product;
	} catch (error) {
		console.log(error);
	} finally {
		knex.destroy();
	}
};

export const createProduct = async (product) => {
	try {
		knex = _knex(config);
		const response = await knex.insert(product).from('products');
		const new_product = await knex.select().from('products').where('id', '=', parseInt(response[0]));
		console.log('✔ ️Producto agregado');
		return new_product;
	} catch (error) {
		console.log(error);
	} finally {
		knex.destroy();
	}
};

export const updateProduct = async (productId, product) => {
	try {
		knex = _knex(config);
		const response = await knex.from('products').where('id', '=', productId).update(product).update({ timestamp: knex.fn.now() });
		console.log('✔ ️Producto actualizado');
		return response;
	} catch (error) {
		console.log(error);
	} finally {
		knex.destroy();
	}
};

export const deleteProductById = async (productId) => {
	try {
		knex = _knex(config);
		const response = await knex.from('products').where('id', '=', productId).del();
		console.log('✔ ️Producto eliminado');
		return response;
	} catch (error) {
		console.log(error);
	} finally {
		knex.destroy();
	}
};
