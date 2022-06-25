import * as usersModel from '../services/users.service.js';
import logger from '../utils/logger.util.js';

export const getUserProfileController = async (req, res) => {
	let userEmail;
	try {
		if (req.session.login) {
			userEmail = req.session.user;
			const userInfo = await usersModel.getUser(userEmail);
			const profilePictureUrl = 'http://' + req.headers.host + '/uploads/' + req.user.profilePicture;
			const profile = true;

			res.status(200).render('pages/profile', { userEmail, profilePictureUrl, profile, userInfo });
		} else {
			res.sendFile(path.resolve() + '/src/views/pages/login.html');
		}
	} catch (error) {
		logger.log('error', error);
	}
};
