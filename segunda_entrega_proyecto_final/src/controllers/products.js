import * as productsModel from '../models/products.model.js';

export const getProductsController = async (req, res) => {
	let products = await productsModel.getAllProducts();
	res.json(products);
};

export const getProductsByIdController = async (req, res) => {
	const id = req.params.id;
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		let product = await productsModel.getProductById(id);
		if (product == null) {
			res.status(500).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json(product);
		}
	} else {
		res.status(400).json({ error: 'El parámetro ID no tiene el formato correcto' });
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
	const id = req.params.id;
	const product = req.body;
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		let updateOutcome = await productsModel.updateProduct(id, product);
		if (!updateOutcome) {
			res.status(500).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto actualizado exitosamente' });
		}
	} else {
		res.status(400).json({ error: 'El parámetro ID no tiene el formato correcto' });
	}
};

export const deleteProductController = async (req, res) => {
	const id = req.params.id;
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		let deleteOutcome = await productsModel.deleteProductById(id);
		if (!deleteOutcome) {
			res.status(500).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto borrado exitosamente' });
		}
	} else {
		res.status(400).json({ error: 'El parámetro ID no tiene el formato correcto' });
	}
};
