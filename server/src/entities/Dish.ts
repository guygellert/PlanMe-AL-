import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToOne, ManyToOne } from 'typeorm';
import { Cuisine } from './Cuisine';
import { DishCategory } from './DishCategory';

@Entity()
export class Dish {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    photo: string;

    @Column({nullable: true})
    isMain: boolean;

    @ManyToMany(() => DishCategory)
    @JoinTable()
    DishCategories: DishCategory[];

    @ManyToOne(() => Cuisine)
    cuisines?: Cuisine | null;
}