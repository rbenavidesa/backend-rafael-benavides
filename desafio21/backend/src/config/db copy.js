import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logger from '../utils/logger.util.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI, (err) => {
	if (err) {
		logger.log('error', '❌ Error al conectarse a MongoDB');
	} else {
		logger.log('info', '🔥 Conectados a MongoDB');
	}
});

export default mongoose;
