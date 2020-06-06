import Knex from 'knex'

export async function up(knex: Knex) {
  // CREATE TABLE
  return knex.schema.createTable('collection_node', table => {
    table.increments('id').primary()
    table.string('image').notNullable()
    table.string('nome').notNullable()
    table.string('email').notNullable()
    table.string('whatsapp').notNullable()
    table.decimal('latitude').notNullable()
    table.decimal('longitude').notNullable()
    table.string('city').notNullable()
    table.string('uf', 2).notNullable()
  })
}

export async function down(knex: Knex) {
  // DELETE TABLE
  return knex.schema.dropTable('collection_node')
}