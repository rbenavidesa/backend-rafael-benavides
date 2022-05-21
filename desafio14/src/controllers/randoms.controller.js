import { fork } from 'child_process';

export const getRandoms = async (req, res) => {
	console.log('llegue a randoms');
	const computo = fork('./src/utils/randoms.util.js');
	let quantity = Number(req.query.cant);

	if (quantity) {
		if (!(Number.isInteger(quantity) && quantity > 0)) {
			res.status(400).json({ error: 'El parametro cantidad debe ser un número entero positivo.' });
			return;
		}
	}
	if (!quantity) {
		quantity = 100000000;
	}
	if (isNaN(quantity)) {
		res.status(400).json({ error: 'El parametro cantidad debe ser un número entero positivo.' });
		return;
	} else {
		computo.on('message', (resultado) => {
			res.status(200).send({ resultado });
		});

		console.log('Cantidad: ' + quantity);

		computo.send({ quantity: quantity });
		computo.send('start');
	}
};
