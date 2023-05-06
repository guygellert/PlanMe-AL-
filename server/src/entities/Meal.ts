import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Dish } from './Dish';
import { MealCategory } from './MealCategory';

@Entity()
export class Meal extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 0})
    rating: number

    @ManyToOne(() => Dish)
    mainDish: Dish;

    @ManyToOne(() => Dish)
    sideDish: Dish;

    @ManyToMany(() => MealCategory)
    @JoinTable()
    MealCategories: MealCategory[];
}