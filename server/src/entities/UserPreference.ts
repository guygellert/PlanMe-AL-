import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Cousine } from './Cousine';
import { DishCategory } from './DishCategory';
import { MealCategory } from './MealCategory';
import { User } from './User';

@Entity()
export class UserPreference extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @OneToOne(() => User)
    User: User;

    @ManyToMany(() => Cousine)
    @JoinTable()
    cousines: Cousine[];
  
    @ManyToMany(() => DishCategory)
    @JoinTable()
    dishCategories: DishCategory[];
 
    @ManyToMany(() => MealCategory)
    @JoinTable()
    mealCategories: MealCategory[];

}