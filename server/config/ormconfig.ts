import { DataSource } from "typeorm"
import dotenv from "dotenv"
import connectionParser from "pg-connection-string"
import * as entities from '../src/entities'

dotenv.config()
var str: string = `${process.env.POSTGRESQLCONNSTR_pgconnection}`
const connectionOptions = connectionParser.parse(str)
console.log(connectionOptions.password)
const AppDataSource = new DataSource({
  type: "postgres",
  host: `${connectionOptions.host}`,
  port: parseInt(`${connectionOptions.port}`),
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: `${connectionOptions.database}`,
  synchronize: false, //Think TWICE
  logging: false,
  entities: entities,
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
})

export default AppDataSource
