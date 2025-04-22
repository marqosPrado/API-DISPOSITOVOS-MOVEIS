import { Product } from "../domain/Product/Product";

export class ProductRequestDto {
    name!: string;
    description!: string;
    price!: number;

    constructor(name: string, description: string, price: number) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    toDomain(): Product {
        return Product.create(this.name, this.description, this.price);
    }
}
