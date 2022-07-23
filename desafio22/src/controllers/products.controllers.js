// import * as productsDao from '../services/ProductsDao.service.js';
import ProductsDaoFactory from '../services/DAOs/products/ProductsFactory.DAO.js';
import * as authController from '../controllers/auth.controller.js';
import logger from '../utils/logger.util.js';

const productsDao = ProductsDaoFactory.getDao();

export const getProductsController = async (req, res) => {
	try {
		let products = await productsDao.getAllProducts();
		res.json(products);
	} catch (error) {
		logger.log('error', error);
	}
};

export const getProductsCatalogController = async (req, res) => {
	try {
		if (req.session.login) {
			const userEmail = req.user.email;
			const products = await productsDao.getAllProducts();
			const profilePictureUrl = 'http://' + req.headers.host + '/uploads/' + req.user.profilePicture;
			const catalog = true;

			if (req.session.addedProduct) {
				const addedProduct = true;
				req.session.addedProduct = false;
				res.status(200).render('pages/products', { userEmail, profilePictureUrl, catalog, products, addedProduct });
			} else {
				res.status(200).render('pages/products', { userEmail, profilePictureUrl, catalog, products });
			}
		} else {
			res.sendFile(path.resolve() + '/src/views/pages/login.html');
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const getProductsByIdController = async (req, res) => {
	try {
		const id = req.params.id;
		let product = await productsDao.getProductById(id);
		if (product == null) {
			res.status(500).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json(product);
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const postProductController = async (req, res) => {
	try {
		const { body } = req;
		let product = await productsDao.createProduct(body);

		if (product) {
			res.status(200).json({ message: 'Producto guardado exitosamente' });
		} else {
			res.status(500).json({ error: 'El no producto no se guardó' });
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const putProductController = async (req, res) => {
	try {
		const id = req.params.id;
		const product = req.body;

		let updateOutcome = await productsDao.updateProduct(id, product);
		if (!updateOutcome) {
			res.status(500).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto actualizado exitosamente' });
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const deleteProductController = async (req, res) => {
	const id = req.params.id;
	try {
		let deleteOutcome = await productsDao.deleteProductById(id);
		if (!deleteOutcome) {
			res.status(500).json({ error: 'Producto no encontrado' });
		} else {
			res.status(200).json({ message: 'Producto borrado exitosamente' });
		}
	} catch (error) {
		logger.log('error', error);
	}
};
