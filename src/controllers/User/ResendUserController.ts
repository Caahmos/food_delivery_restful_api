import { Request, Response } from "express";
import ResendUserService from "../../services/User/ResendUserService";

export default class ResendUserController {
    static async handle(req: Request, res: Response) {
        try {
            const updatedUser = await ResendUserService.execute(req.user_id);
            res.status(201).json({ message: 'Reenvido com sucesso!', updatedUser });
        } catch (err: any) {
            console.log(err);
            res.status(422).json({ message: 'Falha ao reenviar o código, tente novamente mais tarde!' });
        };
    };
};