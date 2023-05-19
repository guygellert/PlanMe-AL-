import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { Meal } from './Meal';
import { User } from './User';

@Entity()
export class UserMeal {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 0})
    rating: number;

    @ManyToOne(() => Meal)
    meal: Meal;

    @ManyToOne(() => User)
    user: User;
}