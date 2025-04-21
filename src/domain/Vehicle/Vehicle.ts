import {v4 as uuidv4} from "uuid";
import {LicensePlate} from "./LicensePlate";

export class Vehicle {
    private readonly _id: string;
    private _brand: string;
    private _model: string;
    private _year: number;
    private _color: string;
    private _licensePlate: LicensePlate;
    private _registrationDate: Date;
    private _isActive: boolean;

    private constructor(
        brand: string,
        model: string,
        year: number,
        color: string,
        licensePlate: LicensePlate,
        registrationDate: Date,
        isActive: boolean,
        id?: string
    ) {
        this._id = id || uuidv4();
        this._brand = brand;
        this._model = model;
        this._year = year;
        this._color = color;
        this._licensePlate = licensePlate;
        this._registrationDate = registrationDate;
        this._isActive = isActive;
    }

    static create(
        brand: string,
        model: string,
        year: number,
        color: string,
        licensePlate: LicensePlate,
        registrationDate: Date,
        isActive: boolean,
        id?: string
    ): Vehicle {
        return new Vehicle(
            brand,
            model,
            year,
            color,
            licensePlate,
            registrationDate,
            isActive,
            id
        );
    }

    get id(): string {
        return this._id;
    }

    get brand(): string {
        return this._brand;
    }

    set brand(value: string) {
        if (!value) {
            throw new Error("Brand is required");
        }
        if (value.length < 3) {
            throw new Error("Brand must be at least 3 characters long");
        }
        if (value.length > 20) {
            throw new Error("Brand must be at most 20 characters long");
        }
        this._brand = value;
    }

    get model(): string {
        return this._model;
    }

    set model(value: string) {
        if (!value) {
            throw new Error("Model is required");
        }
        if (value.length > 20) {
            throw new Error("Model must be at most 20 characters long");
        }
        this._model = value;
    }

    get year(): number {
        return this._year;
    }

    set year(value: number) {
        if (!value || value < 1886 || value > new Date().getFullYear()) {
            throw new Error("Year is invalid");
        }
        this._year = value;
    }

    get color(): string {
        return this._color;
    }

    set color(value: string) {
        if (!value) {
            throw new Error("Color is required");
        }
        if (value.length < 3) {
            throw new Error("Color must be at least 3 characters long");
        }
        if (value.length > 15) {
            throw new Error("Color must be at most 20 characters long");
        }
        this._color = value;
    }

    get licensePlate(): LicensePlate {
        return this._licensePlate;
    }

    set licensePlate(value: LicensePlate) {
        if (!value) {
            throw new Error("License plate is required");
        }
        this._licensePlate = value;
    }

    get registrationDate(): Date {
        return this._registrationDate;
    }

    set registrationDate(value: Date) {
        if (!value) {
            throw new Error("Registration date is required");
        }
        this._registrationDate = value;
    }


    get isActive(): boolean {
        return this._isActive;
    }

    active(): void {
        if (this._isActive) {
            throw new Error("Vehicle already active");
        }
        this._isActive = true;
    }

    disable(): void {
        if (!this._isActive) {
            throw new Error("Vehicle already disabled")
        }
        this._isActive = false;
    }
}