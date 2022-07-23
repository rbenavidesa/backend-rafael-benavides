import path from 'path';

export default function auth(req, res, next) {
	if (req.session.login) {
		next();
	} else {
		// Si el usuario no está autenticado se envía al login sin dar una explicación
		// return res.status(401).render('pages/login', {});
		return res.status(401).sendFile(path.resolve() + '/src/views/pages/login.html');
	}
}
