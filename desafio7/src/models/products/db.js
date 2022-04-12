import { config } from './config.js';
// console.log(config);
import _knex from 'knex';

export const knex = _knex(config);
