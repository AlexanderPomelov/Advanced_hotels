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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_js_1 = __importDefault(require("./routes/userRoutes.js"));
const postgresDataSource_js_1 = require("./data-source/postgresDataSource.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', userRoutes_js_1.default);
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        yield postgresDataSource_js_1.postgresDataSource.initialize().then(() => {
            console.log("Data Source has been initialized! From server.ts");
        }).catch((err) => {
            console.error("Error during Data Source initialization: ", err);
        });
    });
}
connect();
// Запуск сервера
const port = 8000;
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});
exports.default = connect;
