import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity()
export class TestUser {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({type: "varchar", length: 100})
    firstName!: string

    @Column({type: "varchar", length: 100})
    email!: string

    @Column({type: "boolean"})
    isActive!: boolean
}