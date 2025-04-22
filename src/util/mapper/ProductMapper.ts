import { Product } from "../../domain/Product/Product";
import { ProductAggregate } from "../../aggregates/ProductAggregate";

export class ProductMapper {
    static fromDomainToAggregate(product: Product): ProductAggregate {
        return new ProductAggregate(
            product.id,
            product.name,
            product.description,
            product.price
        );
    }
}
