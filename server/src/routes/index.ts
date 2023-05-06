
import express from "express"
import mealRouter from "./meal-route"
import User from "./user"

const router = express.Router()

router.use("/user", User)
router.use("/meal",mealRouter)

export default router