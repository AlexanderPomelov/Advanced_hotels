"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const postgresDataSource_1 = require("../data-source/postgresDataSource");
const entityUser_1 = require("../entityUser");
class UserController {
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = postgresDataSource_1.postgresDataSource.getRepository(entityUser_1.TestUser);
            try {
                const users = yield userRepository.find();
                return res.status(200).json(users);
            }
            catch (err) {
                return res.json(err);
            }
        });
    }
    ;
    getOneUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = postgresDataSource_1.postgresDataSource.getRepository(entityUser_1.TestUser);
            const { id } = req.params;
            try {
                const user = yield userRepository.findOneBy({ id: parseInt(id) });
                if (!user) {
                    return res.status(404).json({ message: "Пользователь не найден" });
                }
                return res.json(user);
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
        });
    }
    addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = postgresDataSource_1.postgresDataSource.getRepository(entityUser_1.TestUser);
            try {
                const newUser = userRepository.create(req.body);
                const savedUser = yield userRepository.save(newUser);
                return res.status(201).json(savedUser);
            }
            catch (err) {
                return res.json({ message: err });
            }
        });
    }
    ;
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = postgresDataSource_1.postgresDataSource.getRepository(entityUser_1.TestUser);
            const { id } = req.params;
            try {
                const userToUpdate = yield userRepository.findOneBy({ id: parseInt(id) });
                if (!userToUpdate) {
                    return res.status(404).json({ message: "Пользователь не найден" });
                }
                userRepository.merge(userToUpdate, req.body);
                const updatedUser = yield userRepository.save(userToUpdate);
                return res.json(updatedUser);
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = postgresDataSource_1.postgresDataSource.getRepository(entityUser_1.TestUser);
            const { id } = req.params;
            try {
                const deleteResult = yield userRepository.delete(id);
                if (deleteResult.affected === 0) {
                    return res.status(404).json({ message: "Пользователь не найден" });
                }
                return res.status(204).send("Пользователь удален");
            }
            catch (err) {
                return res.status(400).json({ message: err });
            }
        });
    }
}
exports.default = new UserController;
