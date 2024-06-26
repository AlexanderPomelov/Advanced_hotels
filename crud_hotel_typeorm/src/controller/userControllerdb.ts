import { postgresDataSource } from "../data-source/postgresDataSource";
import { TestUser } from "../entityUser";
import { Request, Response } from "express";


class UserController{

    async getUsers(req: Request, res: Response): Promise<any>{
        const userRepository = postgresDataSource.getRepository(TestUser);
        try {
            const users = await userRepository.find();
            return res.status(200).json(users);
        } catch (err) {
            return res.json({message: err});
        }
    };

    async getOneUser(req: Request, res: Response): Promise<any> {
        const userRepository = postgresDataSource.getRepository(TestUser);
        const { id } = req.params;
        try {
            const user = await userRepository.findOneBy({ id: parseInt(id) });
            if (!user) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }
            return res.json(user);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    async addUser(req: Request, res: Response): Promise<any>{
        const userRepository = postgresDataSource.getRepository(TestUser);
        try {
            const newUser = userRepository.create(req.body);
            const savedUser = await userRepository.save(newUser);
            return res.status(201).json(savedUser)
        } catch (err) {
            return res.json({message: err});
        }
    };

    async updateUser(req: Request, res: Response): Promise<any> {
        const userRepository = postgresDataSource.getRepository(TestUser);
        const { id } = req.params;
        try {
            const userToUpdate = await userRepository.findOneBy({ id: parseInt(id) });
            if (!userToUpdate) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }
            userRepository.merge(userToUpdate, req.body);
            const updatedUser = await userRepository.save(userToUpdate);
            return res.json(updatedUser);
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }

    async deleteUser(req: Request, res: Response): Promise<any> {
        const userRepository = postgresDataSource.getRepository(TestUser);
        const { id } = req.params;
        try {
            const deleteResult = await userRepository.delete(id);
            if (deleteResult.affected === 0) {
                return res.status(404).json({ message: "Пользователь не найден" });
            }
            return res.status(204).send("Пользователь удален");
        } catch (err) {
            return res.status(400).json({ message: err });
        }
    }
}
    export default new UserController;