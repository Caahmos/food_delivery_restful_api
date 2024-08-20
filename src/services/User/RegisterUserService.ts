import { ObjectId } from "mongoose";
import { RegisterUserRequest } from "../../interfaces/User/RegisterUserRequest";
import User from "../../models/User";
import EmailService from "../../utils/NodeMailer";
import Utils from "../../utils/Utils";

export default class RegisterUserService {
    static async execute(registerUserData: RegisterUserRequest) {
        const userExists = await User.findOne({ email: registerUserData.email }) as RegisterUserRequest;

        if (userExists) throw new Error('Email already exists');

        const password = await Utils.generateHash(registerUserData.password, 10);
        registerUserData.password = password as string;

        
        const registeredUser = await User.create(registerUserData);
        
        const token = Utils.generateToken(String(registeredUser._id));

        await EmailService.sendEmail({
            to: 'cauaalexmorales@gmail.com',
            subject: 'Your verification code',
            html: `Your code is: ${registeredUser.verification_token}`
        })

        return {registeredUser, token};
    };
};