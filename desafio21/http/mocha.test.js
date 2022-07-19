import { strict as assert } from 'assert';
import axios from 'axios';

// Request 1 getProducts
const response1 = await axios.get('http://localhost:8080/api/products/');

// Request 2 addProduct
const newProduct = {
	name: 'Acuarela Test',
	description: 'Insumos para pintar',
	code: 'prod-007',
	price: 100,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/paint-color-pallete-brush-academy-256.png',
};

const response2 = await axios.post('http://localhost:8080/api/products/', newProduct);
const response3 = await axios.get('http://localhost:8080/api/products/');
const productId = response3.data[0]._id;

// Request 3 updateProduct(id)
const updatedProduct = {
	name: 'Acuarela Update',
	description: 'Insumos para pintar Update',
	code: 'prod-007-Update',
	price: 1001,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/paint-color-pallete-brush-academy-256.png',
};

const response4 = await axios.put('http://localhost:8080/api/products/' + productId, updatedProduct);
const response5 = await axios.get('http://localhost:8080/api/products/');

// Request 4 deleteProduct(id)
const response6 = await axios.delete('http://localhost:8080/api/products/' + productId);
const response7 = await axios.get('http://localhost:8080/api/products/');

// Acá comienza la ejecución de los tests
// Este test toma como supuesto que la colección de productos comienza vacía y que existe una sesión iniciada
describe('Test API Productos', () => {
	it('Test getAllProducts debería traer un arreglo vacío de objetos', () => {
		assert.strictEqual(response1.data.length, 0);
	});

	it('Test addProduct debería agregar un objeto a la base de datos', () => {
		assert.deepStrictEqual(response2.data, { message: 'Producto guardado exitosamente' });
		assert.strictEqual(response3.data.length, 1);
	});

	it('Test update Product: debería devolver un mensaje de éxito y luego al consultar por todos los productos únicamente existir el producto con la información actualizada', () => {
		assert.deepStrictEqual(response4.data, { message: 'Producto actualizado exitosamente' });
		assert.strictEqual(response5.data.length, 1);
		assert.strictEqual(response5.data[0]._id, productId);
		assert.strictEqual(response5.data[0].name, 'Acuarela Update');
		assert.strictEqual(response5.data[0].description, 'Insumos para pintar Update');
		assert.strictEqual(response5.data[0].code, 'prod-007-Update');
		assert.strictEqual(response5.data[0].price, 1001);
	});

	it('Test delete product: debería eliminar un producto en la BD', () => {
		assert.deepStrictEqual(response6.data, { message: 'Producto borrado exitosamente' });
		assert.strictEqual(response7.data.length, 0);
	});
});

// Prueba de errores
const productIdError = '62d6cb84255c41cc2527c5b6';
const response11 = await axios.post('http://localhost:8080/api/products/', newProduct);

// Request 5 error updateProduct(id)
let updateErrorMessage;
try {
	const response8 = await axios.put('http://localhost:8080/api/products/' + productIdError, updatedProduct);
} catch (error) {
	updateErrorMessage = error.response.data;
}

// Request 6 error deleteProduct(id)
let deleteErrorMessage;
try {
	const response9 = await axios.delete('http://localhost:8080/api/products/' + productId);
} catch (error) {
	deleteErrorMessage = error.response.data;
}

const response10 = await axios.get('http://localhost:8080/api/products/');

describe('Test errores API productos', () => {
	it('Debería devolver un error cuando se intenta actualizar un producto que no existe', () => {
		assert.deepStrictEqual(updateErrorMessage, { error: 'Producto no encontrado' });
	});

	it('Debería devolver un error cuando se intenta borrar un producto que no existe', () => {
		assert.deepStrictEqual(deleteErrorMessage, { error: 'Producto no encontrado' });
		assert.strictEqual(response10.data.length, 1);
	});
});
