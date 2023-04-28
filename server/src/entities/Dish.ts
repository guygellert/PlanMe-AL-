import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';
import { Cuisine } from './Cuisine';
import { DishCategory } from './DishCategory';

@Entity()
export class Dish extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    photo: string;

    @ManyToMany(() => DishCategory)
    @JoinTable()
    DishCategories: DishCategory[];

    @ManyToOne(() => Cuisine)
    cuisines?: Cuisine | null;
}