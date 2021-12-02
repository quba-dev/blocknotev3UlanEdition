import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
export class Account extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    username: string

    @Column({unique: true})
    email: string

    @Column()
    password: string
}