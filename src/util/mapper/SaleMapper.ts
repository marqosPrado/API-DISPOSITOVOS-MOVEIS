import { Sale } from "../../domain/Sale/Sale";
import { SaleAggregate } from "../../aggregates/SaleAggregate";

export class SaleMapper {
    static fromDomainToAggregate(sale: Sale): SaleAggregate {
        return new SaleAggregate(
            sale.id,
            sale.date,
            sale.description,
            sale.quantity,
            sale.total
        );
    }
}
