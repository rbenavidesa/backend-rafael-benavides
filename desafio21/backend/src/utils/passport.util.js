import { Strategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
// import * as userModel from '../services/users.service.js';
import UsersDaoFactory from '../services/DAOs/users/UsersFactory.DAO.js';
import path from 'path';
const __dirname = path.resolve();
import logger from '../utils/logger.util.js';

const usersDao = UsersDaoFactory.getDao();

passport.use(
	'signup',
	new Strategy(
		{
			passReqToCallback: true,
			usernameField: 'email',
			passwordField: 'password',
		},
		async (req, username, password, done) => {
			try {
				const userExists = await usersDao.emailExists(username);
				if (userExists) {
					logger.log('warn', 'Esta dirección de correo ya fue registrada previamente.');

					return done(null, false);
				}

				const newUser = {
					email: username,
					password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
					firstName: req.body.firstName,
					lastName: req.body.lastName,
					age: req.body.age,
					address: req.body.address,
					phoneNumber: req.body.phoneNumber,
					profilePicture: new Date().toISOString() + '_' + req.files.profilePicture.name.replace(/\s/g, ''),
				};

				const user = await usersDao.createUser(newUser);

				// Antes de retornar, guardo el la foto de perfil en el servidor
				const profilePictureFile = req.files.profilePicture;
				const uploadPath = __dirname + '/src/public/uploads/' + newUser.profilePicture;

				profilePictureFile.mv(uploadPath, function (error) {
					if (error) {
						logger.log('error', error);
					}
					logger.log('info', 'File uploaded to ' + uploadPath);
				});

				return done(null, user);
			} catch (error) {
				logger.log('error', error);
			}
		}
	)
);

passport.use(
	'login',
	new Strategy(
		{
			usernameField: 'email',
			passwordField: 'password',
		},
		async (username, password, done) => {
			try {
				const user = await usersDao.emailExists(username);
				if (!user) {
					logger.log('warn', 'Email no encontrado!');
					return done(null, false);
				}
				const isValid = bcrypt.compareSync(password, user.password);
				if (isValid) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (error) {
				logger.log('error', error);
				done(error);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	usersDao.deserializeUser(id, done);
});

export default passport;
