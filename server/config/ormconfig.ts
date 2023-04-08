import { DataSource } from "typeorm"
import dotenv from "dotenv"
import connectionParser from "pg-connection-string"
import { User } from "../src/entity/User"

dotenv.config()

var str: string = `${process.env.POSTGRESQLCONNSTR_pgconnection}`
const connectionOptions = connectionParser.parse(str)

const AppDataSource = new DataSource({
  type: "postgres",
  host: `${connectionOptions.host}`,
  port: parseInt(`${connectionOptions.port}`),
  username: connectionOptions.user,
  password: connectionOptions.password,
  database: `${connectionOptions.database}`,
  synchronize: false, //Think TWICE
  logging: false,
  entities: [User], //["src/entity/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
})

export default AppDataSource
