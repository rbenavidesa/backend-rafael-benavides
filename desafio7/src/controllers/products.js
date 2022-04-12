import express from 'express';
import * as productsModel from '../models/products/productsModel.js';

export const getProductsController = async (req, res) => {
	let products = await productsModel.getAllProducts();
	res.json(products);
};

export const getProductsByIdController = async (req, res) => {
	const id = Number(req.params.id);

	if (Number.isInteger(id)) {
		let product = await productsModel.getProductById(id);
		if (product == null) {
			res.status(200).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json(product);
		}
	} else {
		res.status(400).json({ error: 'El parametro ID debe se un número entero' });
	}
};

export const postProductController = async (req, res) => {
	const { body } = req;
	let product = await productsModel.createProduct(body);

	if (product) {
		res.status(200).json(product);
	} else {
		res.status(500).json({ error: 'El no producto no se guardó' });
	}
};

export const putProductController = async (req, res) => {
	console.log('llegue');
	const id = Number(req.params.id);
	let product = req.body;

	if (Number.isInteger(id)) {
		product.id = id;
		let updateOutcome = await productsModel.updateProduct(id, product);
		if (!updateOutcome) {
			res.status(500).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto actualizado exitosamente' });
		}
	} else {
		res.status(400).json({ error: 'El parametro ID debe se un número entero' });
	}
};

export const deleteProductController = async (req, res) => {
	const id = Number(req.params.id);

	if (Number.isInteger(id)) {
		let deleteOutcome = await productsModel.deleteProductById(id);
		if (!deleteOutcome) {
			res.status(500).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto borrado exitosamente' });
		}
	} else {
		res.status(400).json({ error: 'El parametro ID debe se un número entero' });
	}
};
