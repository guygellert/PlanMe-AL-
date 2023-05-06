import { Entity, Column,PrimaryColumn, PrimaryGeneratedColumn,OneToOne,ManyToMany,JoinTable  } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { User } from './User';
import { Cuisine } from './Cuisine';
import { DishCategory } from './DishCategory';
import { MealCategory } from './MealCategory';
@Entity()
export class UserPreference extends BaseEntity {
    @OneToOne(() => User)
    @PrimaryColumn()
    id: number;

    @ManyToMany(() => Cuisine)
    @JoinTable()
    cuisines: Cuisine[]

    @ManyToMany(() => DishCategory)
    @JoinTable()
    DishCategories: DishCategory[]

    @ManyToMany(() => MealCategory)
    @JoinTable()
    MealCategories: MealCategory[]
}