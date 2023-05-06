
import express from "express"
import mealRouter from "./meal-route"
import User from "./user"
import Cuisine from "./cuisine"
import MealCategory  from "./mealCategory"
import DishCategory  from "./dishCategory"
import UserPreferences from "./userPreference"
import passport from "passport"
import { JwtStrategy, userPassportMiddleware } from "../auth/tokensFuncs"
const router = express.Router()


router.use(userPassportMiddleware)
router.use("/user", User)
router.use("/meal",mealRouter)

router.use("/cuisine", Cuisine)
router.use("/mealCategory", MealCategory)
router.use("/dishCategory", DishCategory)
router.use("/userPreference", UserPreferences)
export default router