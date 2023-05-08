import express from "express"
import dotenv from "dotenv"
import AppDataSource from "../config/ormconfig"
import router from "./routes/index"
import { createUser, login } from "./modules/User/handler"
import { getAllCuisine } from "./modules/Cuisine/handler"
import cors from "cors"
import cookieParser from "cookie-parser"
import { authenticate } from "./middlewares/auth"
import { JwtStrategy, refreshToken } from "./auth/tokensFuncs"
import { initializeDB } from "./setup"
import passport from "passport"

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

passport.initialize()
passport.use('userJwt', JwtStrategy)
app.use("/login", login)
app.use("/register", createUser)
app.use("/refresh_token", refreshToken)

initializeDB();

app.use('/', router)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})