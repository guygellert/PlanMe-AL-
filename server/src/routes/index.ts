
import express from "express"
import mealRouter from "./meal-route"
import User from "./user"
import Cuisine from "./cuisine"
import MealCategory  from "./mealCategory"
import DishCategory  from "./dishCategory"
import UserPreferences from "./userPreference"
import UserFavorite from "./userFavorite"
import { userPassportMiddleware } from "../auth/tokensFuncs"
import dishRouter from "./dish"
const router = express.Router()

router.use(userPassportMiddleware)
router.use("/user", User)
router.use("/meal",mealRouter)
router.use("/dish",dishRouter)
router.use("/cuisine", Cuisine)
router.use("/mealCategory", MealCategory)
router.use("/dishCategory", DishCategory)
router.use("/userPreference", UserPreferences)
router.use("/userFavorite", UserFavorite)
export default router