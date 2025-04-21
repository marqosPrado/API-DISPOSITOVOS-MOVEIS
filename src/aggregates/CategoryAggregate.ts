import {Column, Entity, PrimaryColumn} from "typeorm";
import {Category} from "../domain/Category/Category";

@Entity('CATEGORIES')
export class CategoryAggregate {

    @PrimaryColumn({name: 'CAT_ID'})
    id: string;

    @Column({nullable: false, name: 'CAT_NAME'})
    name: string;

    @Column({nullable: false, name: 'CAT_DESCRIPTION'})
    description: string;

    constructor(
        id: string,
        name: string,
        description: string,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
    }

    toDomain() {
        return Category.create(
            this.name,
            this.description,
            this.id
        )
    }

}