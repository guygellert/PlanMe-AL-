import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Meal } from './Meal';
import { User } from './User';

@Entity()
export class UserMeal extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default: 0})
    rating: number;

    @ManyToOne(() => Meal)
    meal: Meal;

    @ManyToOne(() => User)
    user: User;
}