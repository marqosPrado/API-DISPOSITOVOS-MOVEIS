import bcrypt from "bcrypt";

export class Encryption {
    static async encryptPassword(password: string): Promise<string> {
        if (!password || password.length < 8) {
            throw new Error('Password must be at least 8 characters long');
        }
        return await bcrypt.hash(password, 10);
    }
}