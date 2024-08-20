import { Request, Response } from "express";
import { VerifyUserRequest } from "../../interfaces/User/VerifyUserRequest";
import VerifyUserService from "../../services/User/VerifyUserService";

export default class VerifyUserController {
    static async handle(req: Request, res: Response) {
        const { email, verification_token }: VerifyUserRequest = req.body;

        
        try {
            const validatedUser = await VerifyUserService.execute({ email, verification_token});
            res.status(201).json({ message: 'Usuário verificado com sucesso!', validatedUser });
        } catch (err: any) {
            res.status(422).json({ message: err.message });
        };
    };
};