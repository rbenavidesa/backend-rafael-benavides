import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const myFormat = printf(({ level, message, timestamp }) => {
	return `${level}: ${message} ${timestamp}`;
});

const logger = createLogger({
	format: combine(
		timestamp({
			format: 'YYYY-MM-DD HH:mm:ss',
		}),
		myFormat
	),
	transports: [
		new transports.Console({ level: 'info' }),
		new transports.File({ filename: 'warning.log', level: 'warn' }),
		new transports.File({ filename: 'error.log', level: 'error' }),
	],
});

export default logger;
