import {UserRequestDto} from "../../dto/user-request.dto";
import {User} from "../../domain/User/User";
import {UserMapper} from "../../util/mapper/UserMapper";
import {UserRepository} from "../../repositories/UserRepository";
import {UserUpdateDto} from "../../dto/user-update.dto";
import {Encryption} from "../../util/Encryption";

export class UserService {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    async registerUser(input: UserRequestDto): Promise<User> {
        const existing = await this.userRepository.findByEmail(input.email);
        if (existing) {
            throw new Error("User already exists");
        }

        const hashedPassword = await Encryption.encryptPassword(input.password);

        const user = await User.create(
            input.name,
            input.email,
            hashedPassword,
            input.birthdate
        );

        return await this.userRepository.registerUser(user);
    }


    async findAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    }

    async disable(userId: string) {
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }
        user.disable();
        return await this.userRepository.registerUser(user);
    }

    async edit(dto: UserUpdateDto) {
        const user = await this.userRepository.findById(dto.id as string);
        if (!user) {
            throw new Error("User not found");
        }

        if (dto.password) {
            dto.password = await Encryption.encryptPassword(dto.password);
        }

        await user.update({
            name: dto.name,
            email: dto.email,
            password: dto.password,
            birthdate: dto.birthdate
        });

        return await this.userRepository.update(
            UserMapper.fromDomainToAggregate(user)
        );
    }

}