import logger from '../utils/logger.util.js';
import UsersDaoFactory from '../services/DAOs/users/UsersFactory.DAO.js';

const usersDao = UsersDaoFactory.getDao();

export const getUserProfileController = async (req, res) => {
	let userEmail;
	try {
		if (req.session.login) {
			userEmail = req.session.user;
			const userInfo = await usersDao.getUser(userEmail);
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
