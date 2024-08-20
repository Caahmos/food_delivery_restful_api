import { body } from "express-validator";

export default class VerifyUserValidator{
    static verify(){
        return [
            body('verification_token').isNumeric().withMessage('Invalid OTP'),
            body('email').isString().withMessage('Invalid email'),
        ]
    };
};