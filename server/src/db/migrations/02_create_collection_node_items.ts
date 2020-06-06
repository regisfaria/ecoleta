import Knex from 'knex'

export async function up(knex: Knex) {
  // CREATE TABLE
  return knex.schema.createTable('collection_node_items', table => {
    table.increments('id').primary()
    table.integer('collection_node_id').unsigned().notNullable().references('id').inTable('collection_node').onDelete('CASCADE').index()
    table.integer('item_id').unsigned().notNullable().references('id').inTable('items').onDelete('CASCADE').index()
  })
}

export async function down(knex: Knex) {
  // DELETE TABLE
  return knex.schema.dropTable('collection_node_items')
}