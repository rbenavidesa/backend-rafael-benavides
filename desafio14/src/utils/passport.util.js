import { Strategy } from 'passport-local';
import passport from 'passport';
import bcrypt from 'bcrypt';
// import { UserModel } from '../models/user.model.js';
import * as userModel from '../services/users.service.js';

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
				const userExists = await userModel.emailExists(username);
				if (userExists) {
					console.log('Esta dirección de correo ya fue registrada previamente.');
					return done(null, false);
				}
				const newUser = {
					email: username,
					password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
				};
				const user = await userModel.createUser(newUser);
				return done(null, user);
			} catch (error) {
				console.log(error);
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
				const user = await userModel.emailExists(username);
				if (!user) {
					console.log('Email no encontrado!');
					return done(null, false);
				}
				const isValid = bcrypt.compareSync(password, user.password);
				if (isValid) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			} catch (error) {
				console.log(error);
				done(error);
			}
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user._id);
});

passport.deserializeUser((id, done) => {
	userModel.deserializeUser(id, done);
});

export default passport;
