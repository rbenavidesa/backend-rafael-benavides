// Midleware a nivel aplicación que revisa permiso de administrador
const authorization = (req, res, next) => {
	if (!req.headers.authorization) {
		return res.status(403).json({ error: '-1, descripción: ruta ' + req.path + ' método ' + req.method + ' no autorizada' });
	}
	next();
};

export default authorization;
