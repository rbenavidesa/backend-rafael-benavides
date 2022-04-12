import dotenv from 'dotenv';
dotenv.config();

export const config = {
	client: 'mysql',
	connection: {
		host: process.env.DBHOST,
		port: process.env.DBPORT,
		user: process.env.DBUSER,
		password: process.env.DBPASSWORD,
		database: process.env.DATABASE,
	},
};
