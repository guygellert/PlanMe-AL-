import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class DishCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
}