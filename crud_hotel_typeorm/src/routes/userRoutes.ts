import {Router} from "express";
import UserController from "../controller/userControllerdb"

const router = Router();

router.post('/user', UserController.addUser)
router.get('/users', UserController.getUsers)
router.get('/user/:id', UserController.getOneUser)
router.put('/user/:id', UserController.updateUser)
router.delete('/user/:id', UserController.deleteUser)

export default router