import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Meal } from './Meal';

@Entity()
export class UserMeal extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Meal)
    meal: Meal;

    @Column()
    rating: number;
}