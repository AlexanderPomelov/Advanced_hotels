"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userControllerdb_1 = __importDefault(require("../controller/userControllerdb"));
const router = (0, express_1.Router)();
router.post('/user', userControllerdb_1.default.addUser);
router.get('/users', userControllerdb_1.default.getUsers);
router.get('/user/:id', userControllerdb_1.default.getOneUser);
router.put('/user/:id', userControllerdb_1.default.updateUser);
router.delete('/user/:id', userControllerdb_1.default.deleteUser);
exports.default = router;
