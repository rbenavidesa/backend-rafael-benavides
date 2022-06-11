import * as productsModel from '../services/products.service.js';
import * as authController from '../controllers/auth.controller.js';
import logger from '../utils/logger.util.js';

export const getProductsController = async (req, res) => {
	try {
		let products = await productsModel.getAllProducts();
		res.json(products);
	} catch (err) {
		logger.log('error', error);
	}
};

export const getProductsByIdController = async (req, res) => {
	try {
		const id = req.params.id;
		let product = await productsModel.getProductById(id);
		if (product == null) {
			res.status(500).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json(product);
		}
	} catch (err) {
		logger.log('error', error);
	}
};

export const postProductController = async (req, res) => {
	try {
		const { body } = req;
		let product = await productsModel.createProduct(body);

		if (product) {
			authController.login(req, res);
		} else {
			res.status(500).json({ error: 'El no producto no se guardó' });
		}
	} catch (err) {
		logger.log('error', error);
	}
};

export const putProductController = async (req, res) => {
	try {
		const id = req.params.id;
		const product = req.body;

		let updateOutcome = await productsModel.updateProduct(id, product);
		if (!updateOutcome) {
			res.status(500).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto actualizado exitosamente' });
		}
	} catch (err) {
		logger.log('error', error);
	}
};

export const deleteProductController = async (req, res) => {
	const id = req.params.id;
	try {
		let deleteOutcome = await productsModel.deleteProductById(id);
		if (!deleteOutcome) {
			res.status(500).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto borrado exitosamente' });
		}
	} catch (err) {
		logger.log('error', error);
	}
};
