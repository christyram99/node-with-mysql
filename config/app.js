const env = process.env.NODE_ENV || 'dev';

const dev = {
  app: {
    port: 4900,
    api_version: process.env.API_VERSION || '1.0'
  },
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'venky',
    database: 'todo',
  },
  jwt: {
    token_secret: 'DRXqa9r4UsjO5F0wMybNsd2BdTiKGmzAoL',
    token_life: 2592000, // in seconds -  30 Days 
    refresh_token_secret: 'wXyjKZpuoDsdsmg1MLP8CaHkfO2bUhrF6W',
    refresh_token_life: 7776000 // in seconds - 7 Days
  },
}
const prod = {
  app: {
    port: 4900
  },
  mysql: {
    host: 'localhost',
    user: 'root',
    password: 'venky',
    database: 'todo',
  },
}

const config = {
  dev,
  prod
}

module.exports = config[env]