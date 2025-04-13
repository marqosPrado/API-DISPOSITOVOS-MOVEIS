import {UserRequestDto} from "../../dto/user-request.dto";
import {User} from "../../domain/User/User";
import {UserMapper} from "../../util/mapper/UserMapper";
import {UserRepository} from "../../repositories/UserRepository";

export class UserService {
    constructor(
        private userRepository: UserRepository
    ) {
    }

    async registerUser(input: UserRequestDto): Promise<User> {
        const user = await UserMapper.fromDtoToEntity(input);
        const userAlreadyExists: User | null = await this.userRepository.findByEmail(user.email.content);
        if (userAlreadyExists) {
            throw new Error("User already exists");
        }
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
}