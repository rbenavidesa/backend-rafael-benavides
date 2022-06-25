import twilio from 'twilio';
import dotenv from 'dotenv';
import logger from '../utils/logger.util.js';

dotenv.config();

const client = twilio(process.env.SID, process.env.TOKEN);

export const reportUserNewSaleWP = async (userFirstName, userLastName, userEmail, userPhoneNumber) => {
	try {
		const message = {
			body: 'Nuevo pedido de: ' + userFirstName + ' ' + userLastName + ' Email: ' + userEmail,
			from: 'whatsapp:+14155238886',
			to: 'whatsapp:' + userPhoneNumber,
		};
		const response = await client.messages.create(message);
	} catch (error) {
		logger.log('error', error);
	}
};
