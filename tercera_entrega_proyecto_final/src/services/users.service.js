import '../config/db.js';
import { UserModel } from '../models/user.model.js';
import logger from '../utils/logger.util.js';

export const emailExists = async (email) => {
	try {
		const response = await UserModel.findOne({ email });
		return response;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const getUser = async (userEmail) => {
	try {
		const response = await UserModel.findOne({ email: userEmail });
		return response.toJSON();
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const createUser = async (user) => {
	try {
		const response = await UserModel.create(user);
		return response;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};

export const deserializeUser = async (id, done) => {
	try {
		UserModel.findById(id, done);
		return;
	} catch (error) {
		logger.log('error', error);
		return false;
	}
};
