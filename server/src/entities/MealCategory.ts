import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class MealCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
}