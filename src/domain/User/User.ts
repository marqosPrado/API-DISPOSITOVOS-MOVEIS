import {Email} from "../ValueObjects/Email";
import { v4 as uuidv4 } from 'uuid';
import {Encryption} from "../../util/Encryption";

export class User {
    private readonly _id: string;
    private _name: string;
    private _email: Email;
    private _password: string;
    private _birthdate: Date;
    private readonly _createdAt: Date;

    private constructor(
        name: string,
        email: string,
        password: string,
        birthdate: Date,
        createdAt?: Date,
        id?: string
    ) {
        this._id = id || uuidv4();
        this._name = name;
        this._email = new Email(email);
        this._password = password;
        this._birthdate = new Date(birthdate);
        this._createdAt = createdAt || new Date();
    }

    static async create(
        name: string,
        email: string,
        password: string,
        birthdate: Date,
        createdAt?: Date,
        id?: string
    ): Promise<User> {
        const encryptedPassword: string = await Encryption.encryptPassword(password);
        return new User(
            name,
            email,
            encryptedPassword,
            birthdate,
            createdAt,
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

}