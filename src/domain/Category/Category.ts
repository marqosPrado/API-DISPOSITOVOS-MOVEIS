import {v4 as uuidv4} from "uuid";

export class Category {
    private readonly _id: string;
    private _name: string;
    private _description: string;
    private _updateAt: Date;

    private constructor(
        name: string,
        description: string,
        updateAt?: Date,
        id?: string
    ) {
        this._id = id || uuidv4();
        this._name = name;
        this._description = description;
        this._updateAt = updateAt || new Date();
    }

    static create(name: string, description: string, updateAt?: Date, id?: string): Category {
        return new Category(
            name,
            description,
            updateAt,
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

    update(
        props: {
            name: string | undefined;
            description: string | undefined;
        }) {
        if (props.name) this.name = props.name;
        if (props.description) this.description = props.description;
        this._updateAt = new Date();
    }


    get updateAt(): Date {
        return this._updateAt;
    }

    set updateAt(value: Date) {
        this._updateAt = value;
    }
}