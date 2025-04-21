import {Category} from "../../domain/Category/Category";
import {CategoryAggregate} from "../../aggregates/CategoryAggregate";

export class CategoryMapper {
    static fromDomainToAggregate(category: Category): CategoryAggregate {
        return new CategoryAggregate(
            category.id,
            category.name,
            category.description
        )
    }
}