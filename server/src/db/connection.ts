import knex from 'knex'

const connection = knex({
  client: 'mysql', 
  connection: 
  {
    host: 'localhost', 
    user: 'regisfaria', 
    password: 'regis0402', 
    database: 'ecoleta'
  }
})

export default connection

// Migrations = Database history

