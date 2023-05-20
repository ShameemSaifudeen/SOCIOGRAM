import express from 'express'
import userController from '../../../adapters/controllers/userController'
import { userDbRepository } from '../../../application/repositories/userDbRepository';
import { userRepositoryMongoDB, UserRepositoryMongoDB } from '../../database/Mongodb/repositories/userRepository';

const userRouter = () =>{
    const router = express.Router();
    const controller = userController(userDbRepository,userRepositoryMongoDB)

    router.get('/:id',controller.getUserById)

    return router
}
export default userRouter