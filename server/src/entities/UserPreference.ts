import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Cuisine } from './Cuisine';
import { DishCategory } from './DishCategory';
import { MealCategory } from './MealCategory';
import { User } from './User';

@Entity()
export class UserPreference extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(() => User)
    User: User;

    @ManyToMany(() => Cuisine)
    @JoinTable()
    cuisines: Cuisine[];
  
    @ManyToMany(() => DishCategory)
    @JoinTable()
    dishCategories: DishCategory[];
 
    @ManyToMany(() => MealCategory)
    @JoinTable()
    mealCategories: MealCategory[];

}