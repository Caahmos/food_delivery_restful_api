import { Request, Response } from "express";
import { RegisterUserRequest } from '../../interfaces/User/RegisterUserRequest';
import RegisterUserService from "../../services/User/RegisterUserService";
import Utils from "../../utils/Utils";

export default class RegisterUserController {
    static async handle(req: Request, res: Response) {
        const { name, phone, email, password, type, status }: RegisterUserRequest = req.body;

        try {
            const registeredUser = await RegisterUserService.execute({
                name,
                phone,
                email,
                verification_token: Utils.generateVerificationToken(),
                verification_token_time: new Date(Date.now() + new Utils().MAX_TOKEN_TIME),
                password,
                type,
                status
            });
            res.status(201).json({ message: 'Usuário criado com sucesso!', registeredUser });
        } catch (err: any) {
            res.status(422).json({ message: err.message });
        };
    };
};