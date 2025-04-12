import {UserRequestDto} from "../../dto/user-request.dto";
import {User} from "../../domain/User/User";
import {UserAggregate} from "../../aggregates/UserAggregate";

export class UserMapper {
    static async fromDtoToEntity(dto: UserRequestDto): Promise<User> {
        return await User.create(
            dto.name,
            dto.email,
            dto.password,
            dto.birthdate
        );
    }

    static fromDomainToAggregate(user: User): UserAggregate  {
        return new UserAggregate(
            user.id,
            user.name,
            user.email.content,
            user.password,
            user.birthdate,
            user.createdAt,
        );
    }

    static async fromAggregateToDomain(userAggregate: UserAggregate): Promise<User> {
        return await User.create(
            userAggregate.name,
            userAggregate.email,
            userAggregate.password,
            userAggregate.birthdate,
            userAggregate.createdAt,
            userAggregate.id,
        );
    }
}