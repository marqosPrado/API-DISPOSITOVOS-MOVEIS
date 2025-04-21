import {v4 as uuidv4} from "uuid";

export class Category {
    private readonly _id: string;
    private _name: string;
    private _description: string;

    private constructor(
        name: string,
        description: string,
        id?: string
    ) {
        this._id = id || uuidv4();
        this._name = name;
        this._description = description;
    }

    static create(name: string, description: string, id?: string): Category {
        return new Category(
            name,
            description,
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
        this._name = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }
}