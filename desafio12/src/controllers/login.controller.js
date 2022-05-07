import * as productsModel from '../models/products.model.js';

export const getLoginController = async (req, res) => {
	if (req.session.login) {
		loginController(req, res);
	} else {
		res.status(200).render('pages/main', {});
	}
};

export const loginController = async (req, res) => {
	let user;

	if (req.session.login) {
		user = req.session.user;
		const products = await productsModel.getAllProducts();
		res.status(200).render('pages/products', { user, products });
	} else {
		const { body } = req;
		user = body.user;

		if (user !== '' && user != null) {
			req.session.login = true;
			req.session.user = user;
			const products = await productsModel.getAllProducts();
			res.status(200).render('pages/products', { user, products });
		} else {
			res.status(400).render('pages/main', { invalid_user: true });
		}
	}
};

export const logoutController = async (req, res) => {
	const user = req.session.user;
	console.log('Usuario que sale: ' + user);

	req.session.destroy((err) => {
		if (!err) {
			res.status(200).render('pages/logout', { user });
		} else {
			res.status(400).json(err);
		}
	});
};
