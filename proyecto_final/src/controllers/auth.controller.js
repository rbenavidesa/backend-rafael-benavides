import path from 'path';
import ProductsDaoFactory from '../services/DAOs/products/ProductsFactory.DAO.js';
import CartsDaoFactory from '../services/DAOs/carts/CartsFactory.DAO.js';
import yargs from 'yargs';
import os from 'os';
import * as Email from '../utils/email.util.js';
import UsersDaoFactory from '../services/DAOs/users/UsersFactory.DAO.js';
import logger from '../utils/logger.util.js';

const productsDao = ProductsDaoFactory.getDao();
const cartsDao = CartsDaoFactory.getDao();
const usersDao = UsersDaoFactory.getDao();

export const getSignup = async (req, res) => {
	try {
		res.sendFile(path.resolve() + '/src/views/pages/signup.html');
	} catch (error) {
		logger.log('error', error);
	}
};

export const postSignup = async (req, res) => {
	try {
		const user = req.user._id;
		const cartId = await cartsDao.createUserCart(user);

		// Se notifica el admin el registro de un nuevo usuario via correo

		const newUser = {
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			age: req.body.age,
			address: req.body.address,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
		};

		Email.reportNewUser(newUser);

		// Luego de realizar el proceso de sign up el usuario es redirigido a
		// la vista de login para que ingrese a la plataforma
		res.sendFile(path.resolve() + '/src/views/pages/login.html');
	} catch (error) {
		logger.log('error', error);
	}
};

export const failSignup = async (req, res) => {
	try {
		res.render('pages/signup-error', {});
	} catch (error) {
		logger.log('error', error);
	}
};

export const login = async (req, res) => {
	try {
		let userEmail;
		let profilePictureUrl;

		if (req.session.login) {
			userEmail = req.user.email;
			const products = await productsDao.getAllProducts();
			profilePictureUrl = 'http://' + req.headers.host + '/uploads/' + req.user.profilePicture;
			const catalog = true;

			res.status(200).render('pages/products', { userEmail, catalog, products, profilePictureUrl });
		} else {
			const { body } = req;
			userEmail = body.email;

			if (userEmail !== '' && userEmail != null) {
				// busco la información asociada al usuario
				const userInfo = await usersDao.getUser(userEmail);
				profilePictureUrl = 'http://' + req.headers.host + '/uploads/' + req.user.profilePicture;
				const catalog = true;
				// busco el id del carrito asociado al usuarios
				const userCart = await cartsDao.getUserCart(userInfo._id);

				req.session.login = true;
				req.session.user = userEmail;
				req.session.userId = userInfo._id;
				req.session.userCartId = userCart._id;
				const products = await productsDao.getAllProducts();
				res.status(200).render('pages/products', { userEmail, catalog, products, profilePictureUrl });
			} else {
				res.sendFile(path.resolve() + '/src/views/pages/login.html');
			}
		}
	} catch (error) {
		logger.log('error', error);
	}
};

export const failLogin = async (req, res) => {
	try {
		res.render('pages/login-error', {});
	} catch (error) {
		logger.log('error', error);
	}
};

export const logout = async (req, res) => {
	try {
		const user = req.session.user;

		req.session.destroy((err) => {
			if (!err) {
				res.status(200).render('pages/logout', { user });
			} else {
				res.status(400).json(err);
			}
		});
	} catch (error) {
		logger.log('error', error);
	}
};

export const getInfo = async (req, res) => {
	try {
		const info = {
			msg: 'Test de cambio de vista',
			entry_args: JSON.stringify(yargs(process.argv.slice(2)).argv),
			platform: process.platform,
			nodeVersion: process.version,
			reservedMemory: process.memoryUsage().rss,
			execution_path: process.execPath,
			process_id: process.pid,
			project_path: process.cwd(),
			server_cpu_number: os.cpus().length,
		};

		res.status(200).render('pages/info', { info });
	} catch (error) {
		logger.log('error', error);
	}
};
