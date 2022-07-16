import axios from 'axios';

/* ---------------------------------- AXIOS --------------------------------- */

console.log('Pruebas a través de Axios iniciadas');

async function getAxios() {
	const response = await axios.get('http://localhost:8080/api/products/');
	console.log(response.data);
}
// getAxios();

const newProduct = {
	name: 'Acuarela Test',
	description: 'Insumos para pintar',
	code: 'prod-007',
	price: 100,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/paint-color-pallete-brush-academy-256.png',
};

async function postAxios() {
	const response = await axios.post('http://localhost:8080/api/products/', newProduct);
	console.log(response.data);
}
// postAxios();

const updatedProduct = {
	name: 'Acuarela Update',
	description: 'Insumos para pintar',
	code: 'prod-007',
	price: 100,
	thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/paint-color-pallete-brush-academy-256.png',
};

async function putAxios(productId) {
	const response = await axios.put('http://localhost:8080/api/products/' + productId, updatedProduct);
	console.log(response.data);
}
// putAxios('62d2de2aa8905d480ee0621e');

async function deletetAxios(productId) {
	const response = await axios.delete('http://localhost:8080/api/products/' + productId);
	console.log(response.data);
}
deletetAxios('62d2e00b255c41cc2527c52d');
