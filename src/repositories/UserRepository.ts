import {AppDataSource} from "../config/database/data-source";
import {UserAggregate} from "../aggregates/UserAggregate";
import {Repository} from "typeorm";
import {User} from "../domain/User/User";
import {UserMapper} from "../util/mapper/UserMapper";

export class UserRepository {
    private repository: Repository<UserAggregate> = AppDataSource.getRepository(UserAggregate);

    public async registerUser(user: User): Promise<User> {
        const userAggregate: UserAggregate = UserMapper.fromDomainToAggregate(user);
        const savedAggregate: UserAggregate = await this.repository.save(userAggregate);

        return await savedAggregate.toDomain();
    }

    async findByEmail(email: string): Promise<User | null> {
        const userAggregate: UserAggregate | null = await this.repository.findOne({
            where: {email},
        });

        if (!userAggregate) {
            return null;
        }

        return await userAggregate.toDomain();
    }

    async findById(ownerId: string): Promise<User | null> {
        const userAggregate: UserAggregate | null = await this.repository.findOne({
            where: {id: ownerId},
        });

        if (!userAggregate) {
            return null;
        }

        return await userAggregate.toDomain()
    }

    async findAll(): Promise<User[]> {
        const userAggregates: UserAggregate[] = await this.repository.find();
        return await Promise.all(
            userAggregates.map(userAggregate => userAggregate.toDomain())
        );
    }

    async update(userAggregate: UserAggregate): Promise<User | null> {
        await this.repository.update({id: userAggregate.id}, {
            name: userAggregate.name,
            email: userAggregate.email,
            password: userAggregate.password,
            isActive: userAggregate.isActive,
            updatedAt: userAggregate.updatedAt
        })

        const aggregate = await this.repository.findOneBy({id: userAggregate.id})
        if (!aggregate) {
            return null;
        }
        return aggregate.toDomain()
    }
}