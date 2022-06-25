import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
import logger from '../utils/logger.util.js';

dotenv.config();

const transporterGmail = createTransport({
	service: 'gmail',
	port: 587,
	auth: {
		user: process.env.USER_GMAIL,
		pass: process.env.PASS_GMAIL,
	},
});

export const reportNewUser = async (user) => {
	try {
		const mailOptions = {
			from: process.env.USER,
			to: [process.env.ADMIN_EMAIL, process.env.EMAIL],
			subject: 'Nuevo usuario registrado',
			text:
				'Información de registro:\n\nNombre: ' +
				user.firstName +
				'\nApellido: ' +
				user.lastName +
				'\nEdad: ' +
				user.age +
				'\nDirección: ' +
				user.address +
				'\nEmail: ' +
				user.email +
				'\nTeléfono: ' +
				user.phoneNumber,
		};

		const response = await transporterGmail.sendMail(mailOptions);
	} catch (error) {
		logger.log('error', error);
	}
};

export const reportNewSale = async (userEmail, userFirstName, userLastName, products, totalPrice) => {
	try {
		const producstList = getProductList(products);

		const mailOptions = {
			from: process.env.USER,
			to: [process.env.ADMIN_EMAIL, process.env.EMAIL],
			subject: 'Nuevo pedido de: ' + userFirstName + ' ' + userLastName + ' Email: ' + userEmail,
			text: producstList + 'Precio total del pedido: ' + totalPrice,
		};

		const response = await transporterGmail.sendMail(mailOptions);
	} catch (error) {
		logger.log('error', error);
	}
};

export const getProductList = (products) => {
	try {
		let productsList = '';

		if (products) {
			productsList = 'Productos del pedido: \n\n';

			products.forEach(
				(product) =>
					(productsList +=
						'Nombre del producto: ' +
						product.name +
						'\nCódigo: ' +
						product.code +
						'\nDescripción: ' +
						product.description +
						'\nPrecio: ' +
						product.price +
						'\n\n')
			);

			return productsList;
		} else {
			return false;
		}
	} catch (error) {
		logger.log('error', error);
	}
};
