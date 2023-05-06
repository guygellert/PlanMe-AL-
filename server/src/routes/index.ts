
import express from "express"
import User from "./user"
import Cuisine from "./cuisine"
import MealCategory  from "./mealCategory"
import DishCategory  from "./dishCategory"
import UserPreferences from "./userPreference"
const router = express.Router()

router.use("/user", User)
router.use("/cuisine", Cuisine)
router.use("/mealCategory", MealCategory)
router.use("/dishCategory", DishCategory)
router.use("/userPreference", UserPreferences)
export default router