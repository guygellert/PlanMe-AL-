import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({unique: true})
    mail: string;

    @Column({select: false})
    password: string;
}