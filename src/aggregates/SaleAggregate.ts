import { Column, Entity, PrimaryColumn } from "typeorm";
import { Sale } from "../domain/Sale/Sale";

@Entity('SALES')
export class SaleAggregate {
    @PrimaryColumn({ name: 'SALE_ID' })
    id: string;

    @Column({ name: 'SALE_DATE', type: 'timestamp' })
    date: Date;

    @Column({ name: 'SALE_DESCRIPTION' })
    description: string;

    @Column({ name: 'SALE_QUANTITY' })
    quantity: number;

    @Column({ name: 'SALE_TOTAL' })
    total: number;

    constructor(id: string, date: Date, description: string, quantity: number, total: number) {
        this.id = id;
        this.date = date;
        this.description = description;
        this.quantity = quantity;
        this.total = total;
    }

    toDomain(): Sale {
        return Sale.create(this.date, this.description, this.quantity, this.total, this.id);
    }
}
