export class UserRequestDto {
    readonly name!: string;

    readonly email!: string;

    readonly password!: string;

    readonly birthdate!: Date;

    constructor(name: string, email: string, password: string, birthdate: string) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.birthdate = new Date(birthdate);
    }

}