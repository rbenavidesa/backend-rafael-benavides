import '../../../config/db.js';
import { UserModel } from '../../../models/user.model.js';
import UsersDao from './Users.DAO.js';
import logger from '../../../utils/logger.util.js';

class UsersMongo extends UsersDao {
	constructor() {
		super();
		this.model = UserModel;
		this.logger = logger;
	}

	emailExists = async (email) => {
		try {
			const response = await this.model.findOne({ email });
			return response;
		} catch (error) {
			logger.log('error', error);
			return false;
		}
	};

	getUser = async (userEmail) => {
		try {
			const response = await this.model.findOne({ email: userEmail });
			return response.toJSON();
		} catch (error) {
			logger.log('error', error);
			return false;
		}
	};

	createUser = async (user) => {
		try {
			const response = await this.model.create(user);
			return response;
		} catch (error) {
			logger.log('error', error);
			return false;
		}
	};

	deserializeUser = async (id, done) => {
		try {
			this.model.findById(id, done);
			return;
		} catch (error) {
			logger.log('error', error);
			return false;
		}
	};
}

export default UsersMongo;
