import User from "../../models/User";
import Utils from "../../utils/Utils";
import EmailService from "../../utils/NodeMailer";
import { RegisterUserRequest } from "../../interfaces/User/RegisterUserRequest";
import { ObjectId } from "mongoose";

export default class ResendUserService {
    static async execute(id: ObjectId) {
        const user = await User.findOne({ _id: id }) as RegisterUserRequest;

        if (user.email_verified) throw new Error('O email já foi verificado!');

        const updatedUser = await User.findByIdAndUpdate(id, {
            verification_token: Utils.generateVerificationToken(),
            verification_token_time: new Date(Date.now() + new Utils().MAX_TOKEN_TIME)
        });

        await EmailService.sendEmail({
            to: 'cauaalexmorales@gmail.com',
            subject: 'Your verification code',
            html: `Your code is: ${updatedUser?.verification_token}`
        })

        return updatedUser;
    };
};