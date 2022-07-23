import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from '../utils/logger.util.js';

dotenv.config();

export default class SingletonDb {
	static instance;

	constructor() {
		if (!SingletonDb.instance) {
			this.instance = mongoose.connect(process.env.MONGO_URI, (err) => {
				if (err) {
					logger.log('error', '❌ Error al conectarse a MongoDB');
				} else {
					logger.log('info', '🔥 Conectados a MongoDB');
				}
			});
		} else {
			logger.log('info', 'Se reutiliza la conexión a la DB');
			return SingletonDb.instance;
		}
	}
}
