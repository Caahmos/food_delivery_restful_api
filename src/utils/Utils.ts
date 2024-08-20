import bcryptjs, { genSalt, hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default class Utils {
    public MAX_TOKEN_TIME = (5 * 60 * 1000);

    static generateVerificationToken(digit: number = 6) {
        const digits = '0123456789';
        let otp = '';

        for (let i = 0; i < digit; i++) {
            otp += Math.floor(Math.random() * 10);
        }

        return parseInt(otp);
    }

    static async generateHash(password: string, saltNumber: number) {
        try {
            const salt = await genSalt(saltNumber);
            const hashedPassword = await hash(password, salt);
            return hashedPassword;
        } catch (err: any) {
            console.log(err);
        };
    };

    static async verifyPassword(password: string, hashedPassword: string) {
        try {
            const verifiedPassword = await bcryptjs.compare(password, hashedPassword);
            return verifiedPassword;
        } catch (err: any) {
            console.log(err);
        };
    };

    static generateToken(id: string) {
        const token = jwt.sign(
            { id: id },
            process.env.SECRET as string,
            {
                expiresIn: '15d'
            });

        return token;
    };


};