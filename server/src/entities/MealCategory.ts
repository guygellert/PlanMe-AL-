import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from 'typeorm/repository/BaseEntity';

@Entity()
export class MealCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;
}