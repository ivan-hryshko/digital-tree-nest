// import { Data as AppDataSource } from '@nestjs/typeorm'
import config from '../utils/config'
const entities = [

]

const dataSourceTest = {
  name: 'test',
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'mysecretpassword',
  database: process.env.DB || 'development_test',
  synchronize: true,
  logging: false,
  dropSchema: true,
  entities,
  migrations: ['dist/db/migrations/**/*.js'],
  subscribers: ['dist/subscriber/**/*.js'],
}

// const dataSourceDevelopment = new AppDataSource({
//   name: 'development',
//   type: 'postgres',
//   host: process.env.DB_HOST || 'localhost',
//   port: Number(process.env.DB_PORT) || 5432,
//   username: process.env.DB_USERNAME || 'postgres',
//   password: process.env.DB_PASSWORD || 'mysecretpassword',
//   database: process.env.DB || 'development',
//   synchronize: false,
//   logging: true,
//   logger: 'file',
//   entities,
//   migrations: ['dist/db/migrations/**/*.js'],
//   subscribers: ['dist/subscriber/**/*.js'],
// })
const dataSourceDevelopment = {
  type: 'postgres',
  host: process.env.POSTGRES_DB_HOST || 'localhost',
  port: Number(process.env.POSTGRES_DB_PORT) || 5432,
  username: process.env.POSTGRES_DB_USERNAME,
  password: process.env.POSTGRES_DB_PASSWORD,
  database: process.env.POSTGRES_DB_NAME,
  entities: [],
  synchronize: false,
}

const TypeormDataSources = {
  development: dataSourceDevelopment,
  test: dataSourceTest,
}

const dbConnectionEnv = process.env.POSTGRES_DB_ENV
const appDataSource = TypeormDataSources[dbConnectionEnv]

export async function createTypeOrmConn() {
  return appDataSource.initialize()
}

export default appDataSource