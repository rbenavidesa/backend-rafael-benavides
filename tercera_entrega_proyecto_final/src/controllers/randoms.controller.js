import { fork } from 'child_process';

export const getRandoms = async (req, res) => {
	const computo = fork('./src/utils/randoms.util.js');
	let quantity = Number(req.query.cant);
	const port = 8000;

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
			let obj = { puerto: req.get('host'), p_id: process.pid, resultado: resultado };
			res.status(200).send({ obj });
		});

		computo.send({ quantity: quantity });
		computo.send('start');
	}
};
