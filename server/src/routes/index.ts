
import express from "express"
import User from "./user"

const router = express.Router()

router.use("/user", User)

export default router