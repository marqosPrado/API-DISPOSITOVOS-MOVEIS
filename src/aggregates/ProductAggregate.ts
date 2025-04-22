import { Column, Entity, PrimaryColumn } from "typeorm";
import { Product } from "../domain/Product/Product";

@Entity('PRODUCTS')
export class ProductAggregate {
    @PrimaryColumn({ name: 'PROD_ID' })
    id: string;

    @Column({ nullable: false, name: 'PROD_NAME' })
    name: string;

    @Column({ nullable: false, name: 'PROD_DESCRIPTION' })
    description: string;

    @Column({ nullable: false, name: 'PROD_PRICE', type: 'decimal', precision: 10, scale: 2 })
    price: number;

    constructor(id: string, name: string, description: string, price: number) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
    }

    toDomain(): Product {
        return Product.create(this.name, this.description, this.price, this.id);
    }
}
