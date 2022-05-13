import * as cartsModel from '../services/carts.service.js';

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

	let result = await cartsModel.addProductToCart(cartId, body);
	if (result) {
		res.status(200).json({ id: cartId, msg: 'El producto se agregó al carrito exitosamente.' });
	} else {
		res.status(500).json({ error: 'Id no encontrado. El producto no se le agregó a ningún carrito' });
	}
};

export const deleteCartController = async (req, res) => {
	const id = req.params.id;

	let deleteOutcome = await cartsModel.deleteCartById(id);
	if (deleteOutcome) {
		res.status(200).json({ message: 'Carrito borrado exitosamente' });
	} else {
		res.status(500).json({ error: 'Id no encontrado. Ningún carrito fue borrado' });
	}
};

export const deleteProductCartController = async (req, res) => {
	const cartId = req.params.id;
	const productId = req.params.id_prod;

	let deleteOutcome = await cartsModel.deleteProductById(cartId, productId);
	if (deleteOutcome) {
		res.status(200).json({ message: 'Producto borrado exitosamente del carrito' });
	} else {
		res.status(500).json({ error: 'La combinación ID e ID_PROD no fue encontrada. Ningún producto fue eliminado.' });
	}
};

export const getProductsCartController = async (req, res) => {
	const id = req.params.id;

	let cart = await cartsModel.getProductById(id);
	if (cart) {
		res.status(200).json(cart);
	} else {
		res.status(200).json({ error: 'Carrito no encontrado' });
	}
};
