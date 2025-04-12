import {Column, Entity, PrimaryColumn} from "typeorm";

@Entity("USERS")
export class User {
    @PrimaryColumn()
    id: number;

    @Column("varchar", {length: 50, nullable: false})
    name: string;

    @Column("varchar", {length: 50, nullable: false})
    email: string;

    @Column({nullable: false})
    password: string;

    @Column({name: 'birth_date', nullable: false})
    birthdate: Date;

    @Column({name: 'created_at', nullable: false})
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
