import {Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
import {VehicleAggregate} from "./VehicleAggregate";
import {User} from "../domain/User/User";

@Entity("USERS")
export class UserAggregate {

    @PrimaryColumn({name: "USE_ID"})
    id: string;

    @Column("varchar", {length: 50, nullable: false, name: "USE_NAME"})
    name: string;

    @Column("varchar", {length: 50, nullable: false, name: "USE_EMAIL"})
    email: string;

    @Column({nullable: false, name: "USE_PASSWORD"})
    password: string;

    @Column({nullable: false, name: 'USE_BIRTH_DATE'})
    birthdate: Date;

    @Column({nullable: false, name: 'USE_CREATED_AT'})
    createdAt: Date;

    @OneToMany(() => VehicleAggregate, (vehicle: VehicleAggregate): UserAggregate => vehicle.owner)
    vehicles!: VehicleAggregate[];

    constructor(
        id: string,
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

    async toDomain(): Promise<User> {
        return await User.create(
            this.name,
            this.email,
            this.password,
            this.birthdate,
            this.createdAt,
            this.vehicles?.map(
                (vehicle: VehicleAggregate) => vehicle.toDomain()
            ) ?? [],
            this.id
        )
    }
}
