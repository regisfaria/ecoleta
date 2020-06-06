import path from 'path'

module.exports = {
  client: 'mysql', 
  connection: 
  {
    host: 'localhost', 
    user: 'regisfaria', 
    password: 'regis0402', 
    database: 'ecoleta'
  },
  migrations: {
    directory: path.resolve(__dirname, 'src', 'db', 'migrations')
  },
  seeds:{
    directory: path.resolve(__dirname, 'src', 'db', 'seeds')
  }
}