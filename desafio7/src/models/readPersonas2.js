// import { knex } from './db.js';

import _knex from 'knex';

export const knex = _knex({
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		port: 3306,
		user: 'coderhouse',
		password: 'Rafael1987@',
		database: 'Coderhouse',
	},
});

async function readUser() {
	try {
		const users = await knex.select().from('personas');
		// .where("id", ">", 4).orderBy("id", "desc");
		console.log(users);
	} catch (error) {
		console.log(error);
	} finally {
		knex.destroy();
	}
}

readUser();
