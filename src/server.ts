import express from "express";
import mongoose from "mongoose";
import cors from 'cors';
import UserRouter from './routes/UserRoutes';

export class Server {
    public app = express();

    constructor() {
        this.configServer();
        this.configRoutes();
    }

    connectDB() {
        mongoose.connect('mongodb://localhost:27017/ecommerce')
            .then(() => {
                console.log('Conectado ao banco');
            })
            .catch((err) => {
                console.log(err);
            });
    }

    configServer() {
        this.connectDB();
        this.configBodyParser();
        this.configCors();
    }

    configRoutes() {
        this.app.use('/user', UserRouter);
    }

    configCors() {
        this.app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
    }

    configBodyParser(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }
};



