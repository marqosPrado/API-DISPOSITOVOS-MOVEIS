import { Sale } from "../domain/Sale/Sale";

export class SaleRequestDto {
    date!: Date;
    description!: string;
    quantity!: number;
    total!: number;

    toDomain(): Sale {
        return Sale.create(this.date, this.description, this.quantity, this.total);
    }
}
