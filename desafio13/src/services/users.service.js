import '../config/db.js';
import { UserModel } from '../models/user.model.js';

export const emailExists = async (email) => {
	try {
		const response = await UserModel.findOne({ email });
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const createUser = async (user) => {
	try {
		const response = await UserModel.create(user);
		return response;
	} catch (error) {
		console.log(error);
		return false;
	}
};

export const deserializeUser = async (id, done) => {
	try {
		UserModel.findById(id, done);
		return;
	} catch (error) {
		console.log(error);
		return false;
	}
};
