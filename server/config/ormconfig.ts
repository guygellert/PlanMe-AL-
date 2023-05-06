import { DataSource } from "typeorm"
import dotenv from "dotenv"
import connectionParser from "pg-connection-string"
import { User } from "../src/entity/User"
import { Cuisine } from "../src/entity/Cuisine"
import { MealCategory } from "../src/entity/MealCategory"
import { DishCategory } from "../src/entity/DishCategory"
import { UserPreference } from "../src/entity/UserPreference"
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
  entities: [User,Cuisine,MealCategory,DishCategory,UserPreference], //["src/entity/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
})

export default AppDataSource
