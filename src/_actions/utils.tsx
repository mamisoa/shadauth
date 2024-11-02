import bcrypt from "bcrypt";

export function saltAndHash(plainPassword: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(plainPassword, saltRounds);
}
