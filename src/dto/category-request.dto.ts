import {Category} from "../domain/Category/Category";

export class CategoryRequestDto {
    name!: string;
    readonly description!: string;

    constructor(name: string, description: string) {
        this.name = name;
        this.description = description;
    }

    toDomain(): Category {
        return Category.create(
            this.name,
            this.description,
        );
    }
}