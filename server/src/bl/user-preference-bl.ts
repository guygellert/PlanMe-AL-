import { UserPreference } from "../../src/entities";
import AppDataSource from "../../config/ormconfig"
export const userPreferenceBaseQuery = () => (
    AppDataSource.getRepository(UserPreference)
    .createQueryBuilder('userPreference')
    .innerJoinAndSelect('userPreference.user','user')
    .leftJoinAndSelect('userPreference.cuisines','cuisines')
    .leftJoinAndSelect('userPreference.dishCategories','dishCategories')
    .leftJoinAndSelect('userPreference.mealCategories','mealCategories')
);

export const getUserPreferenceById = (id:number) =>(
    userPreferenceBaseQuery()
    .where('userPreference.userId = :id', {id} )
    .getOne()
);

export const updateNewUserPreference = (userPreference: UserPreference) =>(
    userPreferenceBaseQuery()
    .update(userPreference)
    .execute()
);
