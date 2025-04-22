import { v4 as uuidv4 } from 'uuid';

export class Sale {
    private readonly _id: string;
    private _date: Date;
    private _description: string;
    private _quantity: number;
    private _total: number;

    private constructor(date: Date, description: string, quantity: number, total: number, id?: string) {
        this._id = id || uuidv4();
        this._date = date;
        this._description = description;
        this._quantity = quantity;
        this._total = total;
    }

    static create(date: Date, description: string, quantity: number, total: number, id?: string): Sale {
        return new Sale(date, description, quantity, total, id);
    }

    get id(): string {
        return this._id;
    }

    get date(): Date {
        return this._date;
    }

    get description(): string {
        return this._description;
    }

    get quantity(): number {
        return this._quantity;
    }

    get total(): number {
        return this._total;
    }

    update(props: Partial<Pick<Sale, 'date' | 'description' | 'quantity' | 'total'>>) {
        if (props.date) this._date = props.date;
        if (props.description) this._description = props.description;
        if (props.quantity !== undefined) this._quantity = props.quantity;
        if (props.total !== undefined) this._total = props.total;
    }
}
