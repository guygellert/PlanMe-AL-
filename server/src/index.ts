import express from "express"
import dotenv from "dotenv"
import AppDataSource from "../config/ormconfig"
import router from "./routes/index"
import { createUser, login } from "./modules/User/handler"
import cors from "cors"
import cookieParser from "cookie-parser"
import { authenticate } from "./middlewares/auth"
import { refreshToken } from "./auth/tokensFuncs"

dotenv.config()

const app = express()
const port = 5000

app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
)

app.use(express.json())

app.use("/login", login)
app.use("/register", createUser)
app.use("/refresh_token", refreshToken)

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });

app.use('/', authenticate, router)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})