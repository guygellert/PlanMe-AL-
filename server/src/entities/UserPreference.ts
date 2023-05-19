import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable, JoinColumn } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Cuisine } from './Cuisine';
import { DishCategory } from './DishCategory';
import { MealCategory } from './MealCategory';
import { User } from './User';

@Entity()
export class UserPreference{
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(() => User)
    @JoinColumn()
    user: User;

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