// import * as cartsModel from '../services/carts.service.js';
import ProductsDaoFactory from '../services/DAOs/products/ProductsFactory.DAO.js';
import CartsDaoFactory from '../services/DAOs/carts/CartsFactory.DAO.js';
// import * as productsModel from '../services/ProductsDaoDb.service.js';
import logger from '../utils/logger.util.js';
import * as Email from '../utils/email.util.js';
import * as Twilio from '../utils/twilio.util.js';

const productsDao = ProductsDaoFactory.getDao();
const CartsDao = CartsDaoFactory.getDao();

export const createCartController = async (req, res) => {
	try {
		let id = await CartsDao.createCart();
		if (id) {
			res.status(200).json({ id: id, msg: 'Carrito creado exitosamente' });
		} else {
			res.status(500).json({ error: 'El no producto no se guardó' });
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const createUserCartController = async (req, res) => {
	try {
		let id = await CartsDao.createCart();
		if (id) {
			res.status(200).json({ id: id, msg: 'Carrito creado exitosamente' });
		} else {
			res.status(500).json({ error: 'El no producto no se guardó' });
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const addProductCartController = async (req, res) => {
	try {
		const cartId = req.params.id;
		const { body } = req;

		let result = await CartsDao.addProductToCart(cartId, body);
		if (result) {
			res.status(200).json({ id: cartId, msg: 'El producto se agregó al carrito exitosamente.' });
		} else {
			res.status(500).json({ error: 'Id no encontrado. El producto no se le agregó a ningún carrito' });
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const addUserProductCartController = async (req, res) => {
	try {
		// busco el producto asociado al código
		const productCode = req.body.code;
		const product = await productsDao.getProductByCode(productCode);
		// Agrego el producto al carrtio de usuario
		const userCartId = req.session.userCartId;
		let result = await CartsDao.addProductToCart(userCartId, product);
		if (result) {
			req.session.addedProduct = true;
			res.redirect(307, '/api/products/catalog');
		} else {
			res.status(500).json({ error: 'Id no encontrado. El producto no se le agregó a ningún carrito' });
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const deleteCartController = async (req, res) => {
	try {
		const id = req.params.id;

		let deleteOutcome = await CartsDao.deleteCartById(id);
		if (deleteOutcome) {
			res.status(200).json({ message: 'Carrito borrado exitosamente' });
		} else {
			res.status(500).json({ error: 'Id no encontrado. Ningún carrito fue borrado' });
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const deleteProductCartController = async (req, res) => {
	try {
		const cartId = req.params.id;
		const productId = req.params.id_prod;

		let deleteOutcome = await CartsDao.deleteProductById(cartId, productId);
		if (deleteOutcome) {
			res.status(200).json({ message: 'Producto borrado exitosamente del carrito' });
		} else {
			res.status(500).json({ error: 'La combinación ID e ID_PROD no fue encontrada. Ningún producto fue eliminado.' });
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const getProductsCartController = async (req, res) => {
	try {
		const id = req.params.id;

		let cart = await CartsDao.getCartById(id);
		if (cart) {
			res.status(200).json(cart);
		} else {
			res.status(200).json({ error: 'Carrito no encontrado' });
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const getUserCartController = async (req, res) => {
	try {
		if (req.session.login) {
			const id = req.session.userCartId;
			const userEmail = req.session.user;
			let cartProducts = await CartsDao.getCartById(id);
			const profilePictureUrl = 'http://' + req.headers.host + '/uploads/' + req.user.profilePicture;
			const cart = true;

			const totalPrice = getCartTotalPriceController(cartProducts);

			res.status(200).render('pages/cart', { userEmail, profilePictureUrl, cart, cartProducts, totalPrice });
		} else {
			res.sendFile(path.resolve() + '/src/views/pages/login.html');
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const cartCheckOutController = async (req, res) => {
	try {
		if (req.session.login) {
			const id = req.session.userCartId;
			const userEmail = req.session.user;
			const userFirstName = req.user.firstName;
			const userLastName = req.user.lastName;
			const userPhoneNumber = req.user.phoneNumber;

			let cartProducts = await CartsDao.getCartById(id);
			const totalPrice = getCartTotalPriceController(cartProducts);

			// Notifico al administrador vía email
			Email.reportNewSale(userEmail, userFirstName, userLastName, cartProducts, totalPrice);
			// Notifico al usuario via WhatsApp
			Twilio.reportUserNewSaleWP(userFirstName, userLastName, userEmail, userPhoneNumber);

			// Borro el contenido del carrito ya que la orden se procesó
			let result = await CartsDao.emptyCartById(id);
			if (result) {
				res.status(500).json({ error: 'Id no encontrado. Ningún carrito fue borrado' });
			}

			const checkOutSuccess = true;

			res.status(200).render('pages/cart', { userEmail, checkOutSuccess });
		} else {
			res.sendFile(path.resolve() + '/src/views/pages/login.html');
		}
	} catch (error) {
		logger.log('error', error);
	}
};

const getCartTotalPriceController = (cartProducts) => {
	try {
		let totalPrice = 0;
		cartProducts.forEach((product) => (totalPrice += parseInt(product.price)));
		return totalPrice;
	} catch (error) {
		logger.log('error', error);
	}
};
