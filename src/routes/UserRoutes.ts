import express from 'express';
import GlobalMiddeware from '../middlewares/GlobalMiddleware';
import RegisterUserController from '../controllers/User/RegisterUserController';
import RegisterUserValidator from '../validators/User/RegisterUserValidator';
import VerifyUserController from '../controllers/User/VerifyUserController';
import VerifyUserValidator from '../validators/User/VerifyUserValidator';
import ResendUserController from '../controllers/User/ResendUserController';

class UserRouter {
    public router = express.Router();

    constructor() {
        this.getRoutes();
        this.postRoutes();
        this.patchRoutes();
        this.deleteRoutes();
    }

    getRoutes() {

    }

    postRoutes() {
        this.router.post('/register', RegisterUserValidator.verify(), GlobalMiddeware.checkError, RegisterUserController.handle);
    }

    patchRoutes() {
        this.router.patch('/verify', VerifyUserValidator.verify(), GlobalMiddeware.checkError, VerifyUserController.handle);
        this.router.patch('/resend', GlobalMiddeware.checkUser, ResendUserController.handle);
    }

    deleteRoutes() {

    }

}

export default new UserRouter().router;