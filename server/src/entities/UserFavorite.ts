import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Meal } from './Meal';
import { User } from './User';

@Entity()
export class UserFavorite {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Meal)
    meal: Meal;
}