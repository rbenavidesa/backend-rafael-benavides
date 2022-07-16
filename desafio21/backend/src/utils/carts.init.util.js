import '../config/db.js';
import { CartsModel } from '../modules/carts.modules.js';
import logger from '../utils/logger.util.js';

const product1 = {
	_id: '62636ca88660e8178b7d2896',
	name: 'Escuadra',
	description: 'Plantilla con forma de triángulo isósceles',
	code: 'prod-001',
	price: 123.45,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
	timestamp: new Date('2022-04-23T03:04:08.910+00:00'),
};
const product2 = {
	_id: '62636ca88660e8178b7d2897',
	name: 'Calculadora',
	description: 'Herramienta que realiza operaciones matemáticas',
	code: 'prod-002',
	price: 234.56,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
	timestamp: new Date('2022-04-23T03:04:08.911+00:00'),
};

const product3 = {
	_id: '62636ca88660e8178b7d2898',
	name: 'Globo Terráqueo',
	description: 'Objeto que busca representar al planeta Tierra',
	code: 'prod-003',
	price: 345.67,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
	timestamp: new Date('2022-04-23T03:04:08.912+00:00'),
};

const products1 = [product1, product2, product3];
const products2 = [product3];

const cart1 = {};

const cart2 = {
	products: products1,
};

const cart3 = {
	products: products2,
};

async function collectionInit() {
	try {
		const response = await CartsModel.create(cart3);
	} catch (error) {
		logger.log('error', error);
	}
}

collectionInit();
