import { body } from 'express-validator';

export default class RegisterUserValidator {
    static verify() {
        return [
            body('name').isString().withMessage('Name is required'),
            body('phone').isString().withMessage('Phone is required'),
            body('email').isEmail().withMessage('Email is required'),
            body('password').isString().isLength({ min: 5 }).withMessage('Password is required'),
            body('type').isString().withMessage('Type is required'),
            body('status').isString().withMessage('Status is required')
        ]
    }
}