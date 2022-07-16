import autocannon from 'autocannon';
import { PassThrough } from 'stream';
import logger from '../utils/logger.util.js';

function run(url) {
	const buf = [];
	const outputStream = new PassThrough();

	const inst = autocannon({
		url,
		connections: 100,
		duration: 20,
	});

	autocannon.track(inst, { outputStream });
	outputStream.on('data', (data) => buf.push(data));
	inst.on('done', () => {
		process.stdout.write(Buffer.concat(buf));
	});
}

logger.log('info', 'Running all tests');

run('http://localhost:8080/info');
