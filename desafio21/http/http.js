import http from 'http';

// Request que retorna todos los productos disponibles

const options1 = {
	hostname: 'localhost',
	port: 8080,
	path: '/api/products',
	method: 'get',
};

const request1 = http.request(options1, (res) => {
	console.log(res.statusCode);
	res.on('data', (data) => {
		// console.log(data);
		process.stdout.write(data);
	});
});

request1.on('error', (error) => {
	console.log(error);
});

request1.end();

// Request que agrega un producto

const data = new TextEncoder().encode(
	JSON.stringify({
		name: 'Microscopio',
		description: 'Instrumento de amplificación visual',
		code: 'prod-006',
		price: 1200,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/microscope-lab-science-school-256.png',
	})
);

const options2 = {
	hostname: 'localhost',
	port: 8080,
	path: '/api/products',
	method: 'post',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': data.length,
	},
};

const request2 = http.request(options2, (res) => {
	res.on('data', (data) => {
		process.stdout.write(data);
	});
});

request2.on('error', (err) => console.log(err));
request2.write(data);
request2.end();

// Request que actualiza un producto

const update = new TextEncoder().encode(
	JSON.stringify({
		name: 'Microscopio Updated',
		description: 'Instrumento de amplificación visual',
		code: 'prod-006',
		price: 1200,
		thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/microscope-lab-science-school-256.png',
	})
);

const productId = '62d30d2a255c41cc2527c539';

const options3 = {
	hostname: 'localhost',
	port: 8080,
	path: '/api/products/' + productId,
	method: 'put',
	headers: {
		'Content-Type': 'application/json',
		'Content-Length': update.length,
	},
};

const request3 = http.request(options3, (res) => {
	res.on('data', (data) => {
		process.stdout.write(data);
	});
});

request3.on('error', (err) => console.log(err));
request3.write(update);
request3.end();

// Request que borra un producto

const options4 = {
	hostname: 'localhost',
	port: 8080,
	path: '/api/products/' + productId,
	method: 'delete',
};

const request4 = http.request(options4, (res) => {
	console.log(res.statusCode);
	res.on('data', (data) => {
		process.stdout.write(data);
	});
});

request4.on('error', (error) => {
	console.log(error);
});

request4.end();
