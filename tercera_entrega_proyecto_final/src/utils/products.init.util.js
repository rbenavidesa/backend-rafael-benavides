import '../config/db.js';
import { ProductModel } from '../models/product.model.js';
import logger from '../utils/logger.util.js';

const product1 = {
	name: 'Escuadra',
	description: 'Plantilla con forma de triángulo isósceles',
	code: 'prod-001',
	price: 130,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',
};
const product2 = {
	name: 'Calculadora',
	description: 'Herramienta que realiza operaciones matemáticas',
	code: 'prod-002',
	price: 250,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',
};

const product3 = {
	name: 'Globo Terráqueo',
	description: 'Objeto que busca representar al planeta Tierra',
	code: 'prod-003',
	price: 350,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',
};

const product4 = {
	name: 'Reloj',
	description: 'Instrumento para medir el paso del tiempo',
	code: 'prod-004',
	price: 899,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/clock-stopwatch-timer-time-256.png',
};

const product5 = {
	name: 'Cuaderno',
	description: 'Objeto para realizar anotaciones',
	code: 'prod-005',
	price: 300,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/book-note-paper-school-256.png',
};

const product6 = {
	name: 'Microscopio',
	description: 'Instrumento de amplificación visual',
	code: 'prod-006',
	price: 1200,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/microscope-lab-science-school-256.png',
};

const product7 = {
	name: 'Acuarela',
	description: 'Insumos para pintar',
	code: 'prod-007',
	price: 100,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/paint-color-pallete-brush-academy-256.png',
};

const product8 = {
	name: 'Lapiz',
	description: 'Instrumento para escribir',
	code: 'prod-008',
	price: 55,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/pencil-pen-stationery-school-256.png',
};

async function collectionInit() {
	try {
		const response = await ProductModel.create([product1, product2, product3, product4, product5, product6, product7, product8]);
		logger.log('info', response);
	} catch (error) {
		logger.log('error', error);
	}
}

collectionInit();
