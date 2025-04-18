import {Email} from "../ValueObjects/Email";
import {v4 as uuidv4} from 'uuid';
import {Encryption} from "../../util/Encryption";
import {Vehicle} from "../Vehicle/Vehicle";

export class User {
    private readonly _id: string;
    private _name: string;
    private _email: Email;
    private _password: string;
    private _birthdate: Date;
    private readonly _createdAt: Date;
    private _updatedAt: Date;
    private _isActive: boolean;
    private _vehicles: Vehicle[];

    private constructor(
        name: string,
        email: string,
        password: string,
        birthdate: Date,
        isActive?: boolean,
        vehicles?: Vehicle[],
        createdAt?: Date,
        updatedAt?: Date,
        id?: string
    ) {
        this._id = id || uuidv4();
        this._name = name;
        this._email = new Email(email);
        this._password = password
        this._birthdate = new Date(birthdate);
        this._createdAt = createdAt || new Date();
        this._updatedAt = updatedAt || new Date();
        this._isActive = isActive !== undefined ? isActive : true;
        this._vehicles = vehicles || [];
    }

    static async create(
        name: string,
        email: string,
        password: string,
        birthdate: Date,
        isActive?: boolean,
        createdAt?: Date,
        updatedAt?: Date,
        vehicles?: Vehicle[],
        id?: string
    ): Promise<User> {
        return new User(
            name,
            email,
            password,
            birthdate,
            isActive,
            vehicles,
            createdAt,
            updatedAt,
            id
        );
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        if (!value || value.length < 3) {
            throw new Error('Name must be at least 3 characters long');
        }
        this._name = value;
    }

    get email(): Email {
        return this._email;
    }

    set email(value: Email) {
        if (!value) {
            throw new Error('Email cannot be empty');
        }
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get birthdate(): Date {
        return this._birthdate;
    }

    set birthdate(value: Date) {
        this._birthdate = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }

    get vehicles(): Vehicle[] {
        return this._vehicles.slice();
    }

    addVehicle(vehicle: Vehicle): void {
        this._vehicles.push(vehicle);
    }

    removeVehicle(vehicleId: string): void {
        const newVehicles: Vehicle[] = this._vehicles.filter(
            (vehicle: Vehicle) => vehicle.id !== vehicleId
        );
        if (newVehicles.length === this._vehicles.length) {
            throw new Error('Vehicle not found');
        }
        this._vehicles = newVehicles;
    }

    get isActive(): boolean {
        return this._isActive;
    }

    active(): void {
        if (!this._isActive) {
            this._isActive = true;
            return;
        }
        throw new Error("User already active");
    }

    disable(): void {
        if (this._isActive) {
            this._isActive = false;
            return;
        }
        throw new Error("User already disabled");
    }

    async update(
        props: {
            name: string | undefined;
            email: string | undefined;
            password: string | undefined;
            birthdate: Date | undefined
        }) {
        if (props.name) this.name = props.name;
        if (props.email) this.email = new Email(props.email)
        if (props.password) this.password = await Encryption.encryptPassword(props.password);
        if (props.birthdate) this.birthdate = new Date(props.birthdate);
        this.updatedAt = new Date();
    }


}