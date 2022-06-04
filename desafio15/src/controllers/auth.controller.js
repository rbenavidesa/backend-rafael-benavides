import path from 'path';
import * as productsModel from '../services/products.service.js';
import yargs from 'yargs';
import os from 'os';

export const getSignup = async (req, res) => {
	res.sendFile(path.resolve() + '/src/views/pages/signup.html');
};

export const postSignup = async (req, res) => {
	// Luego de realizar el proceso de sign up el usuario es redirigido a
	// la vista de login para que ingrese a la plataforma
	// req.session.destroy((err) => {
	// 	if (err) {
	// 		res.status(400).json(err);
	// 	}
	// });
	res.sendFile(path.resolve() + '/src/views/pages/login.html');
};

export const failSignup = async (req, res) => {
	res.render('pages/signup-error', {});
};

export const login = async (req, res) => {
	let user;

	if (req.session.login) {
		user = req.session.user;
		const products = await productsModel.getAllProducts();
		res.status(200).render('pages/products', { user, products });
	} else {
		const { body } = req;
		user = body.email;

		if (user !== '' && user != null) {
			req.session.login = true;
			req.session.user = user;
			const products = await productsModel.getAllProducts();
			res.status(200).render('pages/products', { user, products });
		} else {
			res.sendFile(path.resolve() + '/src/views/pages/login.html');
		}
	}
};

export const failLogin = async (req, res) => {
	res.render('pages/login-error', {});
};

export const logout = async (req, res) => {
	const user = req.session.user;

	req.session.destroy((err) => {
		if (!err) {
			res.status(200).render('pages/logout', { user });
		} else {
			res.status(400).json(err);
		}
	});
};

export const getInfo = async (req, res) => {
	const info = {
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
};
