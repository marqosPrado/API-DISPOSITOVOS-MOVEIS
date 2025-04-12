import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({name: 'birth_date'})
    birthdate: Date;

    @Column({name: 'created_at'})
    createdAt: Date;

    constructor(
        id: number,
        name: string,
        email: string,
        password: string,
        birthdate: Date,
        createdAt: Date
    ) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthdate = birthdate;
        this.createdAt = createdAt;
    }
}
