import * as cartsModel from '../models/carts.model.js';
import { ProductsModel } from '../modules/products.modules.js';

export const createCartController = async (req, res) => {
	let id = await cartsModel.createCart();
	if (id) {
		res.status(200).json({ id: id, msg: 'Carrito creado exitosamente' });
	} else {
		res.status(500).json({ error: 'El no producto no se guardó' });
	}
};

export const addProductCartController = async (req, res) => {
	const cartId = req.params.id;
	const { body } = req;

	try {
		await ProductsModel.validate(body);
	} catch (error) {
		console.log(error);
		res.status(400).json({ error: 'El producto no tiene el formato correcto' });
		return;
	}

	if (cartId.match(/^[0-9a-fA-F]{24}$/)) {
		let result = await cartsModel.addProductToCart(cartId, body);
		if (result) {
			res.status(200).json({ id: cartId, msg: 'El producto se agregó al carrito exitosamente.' });
		} else {
			res.status(500).json({ error: 'Id no encontrado. El producto no se le agregó a ningún carrito' });
		}
	} else {
		res.status(400).json({ error: 'El parámetro ID no tiene el formato correcto' });
	}
};

export const deleteCartController = async (req, res) => {
	const id = req.params.id;
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		let deleteOutcome = await cartsModel.deleteCartById(id);
		if (deleteOutcome) {
			res.status(200).json({ message: 'Carrito borrado exitosamente' });
		} else {
			res.status(500).json({ error: 'Id no encontrado. Ningún carrito fue borrado' });
		}
	} else {
		res.status(400).json({ error: 'El parámetro ID no tiene el formato correcto' });
	}
};

export const deleteProductCartController = async (req, res) => {
	const cartId = req.params.id;
	const productId = req.params.id_prod;

	if (cartId.match(/^[0-9a-fA-F]{24}$/) && productId.match(/^[0-9a-fA-F]{24}$/)) {
		let deleteOutcome = await cartsModel.deleteProductById(cartId, productId);
		if (deleteOutcome) {
			res.status(200).json({ message: 'Producto borrado exitosamente del carrito' });
		} else {
			res.status(500).json({ error: 'La combinación ID e ID_PROD no fue encontrada. Ningún producto fue eliminado.' });
		}
	} else {
		res.status(400).json({ error: 'Los parámetros ID y/o ID_PROD deben no tienen el fomato correcto' });
	}
};

export const getProductsCartController = async (req, res) => {
	const id = req.params.id;
	if (id.match(/^[0-9a-fA-F]{24}$/)) {
		let cart = await cartsModel.getProductById(id);
		if (cart) {
			res.status(200).json(cart);
		} else {
			res.status(200).json({ error: 'Carrito no encontrado' });
		}
	} else {
		res.status(400).json({ error: 'El parámetro ID no tiene el formato correcto' });
	}
};
