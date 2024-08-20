import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export default class GlobalMiddleware {
    static checkError(req: Request, res: Response, next: NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array()[0].msg });

        next();
    }

    static checkUser(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization) {
            try {
                const token = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, process.env.SECRET as string) as { id: string };

                if (Types.ObjectId.isValid(decodedToken.id)) {
                    req.user_id = new Types.ObjectId(decodedToken.id);
                    return next();
                } else {
                    return res.status(401).json({ message: 'ID de usuário inválido' });
                }
            } catch (err) {
                return res.status(401).json({ message: 'Token inválido ou expirado' });
            }
        } else {
            return res.status(422).json({ message: 'O usuário não tem permissão' });
        }
    }
}
