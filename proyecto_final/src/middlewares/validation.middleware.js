import { ProductModel } from '../models/product.model.js';
import logger from '../utils/logger.util.js';

export const validateId = async (req, res, next) => {
	try {
		const id = req.params.id;
		const productId = req.params.id_prod;

		if (productId == null) {
			if (id.match(/^[0-9a-fA-F]{24}$/)) {
				next();
			} else {
				res.status(400).json({ error: 'El parámetro ID no tiene el formato correcto' });
			}
		} else {
			if (id.match(/^[0-9a-fA-F]{24}$/) && productId.match(/^[0-9a-fA-F]{24}$/)) {
				next();
			} else {
				res.status(400).json({ error: 'Los parámetros ID y/o ID_PROD deben no tienen el fomato correcto' });
			}
		}
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const validateProduct = async (req, res, next) => {
	try {
		const { body } = req;

		await ProductModel.validate(body);
		next();
	} catch (error) {
		logger.log('error', error);
		res.status(400).json({ error: 'El producto no tiene el formato correcto' });
		return;
	}
};
