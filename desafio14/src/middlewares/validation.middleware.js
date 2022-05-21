import { ProductModel } from '../models/product.model.js';

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
		console.log(error);
		return false;
	}
};

export const validateProduct = async (req, res, next) => {
	try {
		const { body } = req;

		// Este código se agrega solo para usar el formato abreviado del enunciado del desafío
		body.description = 'NA';
		body.code = 'NA';

		await ProductModel.validate(body);
		next();
	} catch (error) {
		res.status(400).json({ error: 'El producto no tiene el formato correcto' });
		return;
	}
};
