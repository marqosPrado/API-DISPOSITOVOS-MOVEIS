import { v4 as uuidv4 } from "uuid";

export class Product {
    private readonly _id: string;
    private _name: string;
    private _description: string;
    private _price: number;

    private constructor(name: string, description: string, price: number, id?: string) {
        this._id = id || uuidv4();
        this._name = name;
        this._description = description;
        this._price = price;
    }

    static create(name: string, description: string, price: number, id?: string): Product {
        return new Product(name, description, price, id);
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

    get price(): number {
        return this._price;
    }

    set price(value: number) {
        this._price = value;
    }

    update(props: { name?: string; description?: string; price?: number }) {
        if (props.name) this.name = props.name;
        if (props.description) this.description = props.description;
        if (props.price !== undefined) this.price = props.price;
    }
}
