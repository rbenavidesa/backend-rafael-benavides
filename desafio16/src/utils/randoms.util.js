const computeRandomNumbers = (quantity) => {
	let random = -1;
	let obj = {};
	console.log('Process ID: ' + process.pid);

	for (let i = 0; i < quantity; i++) {
		// console.log('ID: ' + process.pid + ' iteración: ' + i);

		random = Math.floor(Math.random() * 1000) + 1;
		if (obj[random] !== undefined) {
			obj[random] = obj[random] + 1;
		} else {
			obj[random] = 1;
		}
	}

	return obj;
};

let quantity = 0;

process.on('message', (msg) => {
	if (msg.quantity) {
		quantity = msg.quantity;
	} else {
		const resultado = computeRandomNumbers(quantity);
		process.send(resultado);
	}
});
