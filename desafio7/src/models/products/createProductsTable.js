import { knex } from './db.js';

async function createTable() {
	try {
		const exist = await knex.schema.hasTable('products');
		if (!exist) {
			await knex.schema.createTable('products', (table) => {
				table.increments('id').primary().notNullable(),
					table.string('name', 100).notNullable(),
					table.string('description', 500).notNullable(),
					table.string('code', 20).notNullable(),
					table.float('price').notNullable(),
					table.string('thumbnail', 500).notNullable(),
					table.timestamp('timestamp').defaultTo(knex.fn.now());
			});
			console.log('🔥 Tabla de products creada!');
		} else {
			console.log('❌ La tabla products ya existe');
		}
	} catch (error) {
		console.log(error);
	} finally {
		knex.destroy();
	}
}

createTable();
