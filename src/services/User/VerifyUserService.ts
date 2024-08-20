import { VerifyUserRequest } from "../../interfaces/User/VerifyUserRequest";
import User from "../../models/User";

export default class VerifyUserService {
    static async execute(verifyUserData: VerifyUserRequest) {

        const verifiedUser = await User.findOneAndUpdate(
            {
                email: verifyUserData.email,
                verification_token: verifyUserData.verification_token,
                verification_token_time: { $gt: Date.now() }
            },
            {
                email_verified: true
            }
        ) as VerifyUserRequest;

        if (!verifiedUser) throw new Error('Email doesnt exists');

        return verifiedUser;
    };
};