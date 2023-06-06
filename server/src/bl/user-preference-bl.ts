import { UserPreference } from "../../src/entities";
import AppDataSource from "../../config/ormconfig"
export const userPreferenceBaseQuery = () => (
    AppDataSource.getRepository(UserPreference)
    .createQueryBuilder('userPreference')
    // .innerJoinAndSelect('userPreference.user','user')
    .leftJoinAndSelect('userPreference.cuisines','cuisines')
    .leftJoinAndSelect('userPreference.dishCategories','dishCategories')
    .leftJoinAndSelect('userPreference.mealCategories','mealCategories')
);
export const getUserPreferenceById = (userId:number) =>(
    userPreferenceBaseQuery()
    .where("userPreference.user.id = :userId",{userId})
    .getOne()
);
export const updateNewUserPreference = (userPreference: UserPreference,userId:number) =>(
    AppDataSource.getRepository(UserPreference)
    .save(userPreference)
    // .where("userPreference.user.id = :userId", { userId })
    // .execute()
)
