import 'dotenv/config';
import routerProducts from './routers/products.js';
import routerLogin from './routers/login.router.js';
import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import mongoStore from 'connect-mongo';
import { engine } from 'express-handlebars';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(
	session({
		store: mongoStore.create({
			mongoUrl: process.env.MONGO_URI,
			options: {
				userNewUrlParser: true,
				useUnifiedTopology: true,
			},
		}),
		secret: process.env.SECRET,
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 60000 * 10 },
		rolling: true,
	})
);

app.set('views', './src/views');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.engine(
	'hbs',
	engine({
		extname: '.hbs',
		defaultLayout: 'index.hbs',
		layoutDir: __dirname + 'views/layouts',
		partialsDir: __dirname + '/views/partials',
	})
);

app.use('/api/productos', routerProducts);
app.use('/', routerLogin);

// Middleware a nivel aplicación que revisa las rutas consultadas
app.use((req, res, next) => {
	console.log(req.route);
	if (!req.route) {
		return res.status(404).json({ error: '-2, descripción: ruta ' + req.path + ' método ' + req.method + ' no implementada' });
	}
	next();
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, async () => {
	console.log(`👽 Servidor escuchando en el puerto http://localhost:${PORT}`);
});

server.on('error', (error) => console.log(error));
