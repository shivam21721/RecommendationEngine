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
const AuthController_1 = require("./controllers/AuthController");
const AuthService_1 = require("./services/AuthService");
const AdminController_1 = require("./controllers/AdminController");
const ChefController_1 = require("./controllers/ChefController");
const EmployeeController_1 = require("./controllers/EmployeeController");
AuthService_1.socket.on('connect', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to server');
    try {
        const userData = yield (0, AuthController_1.login)();
        if ('Admin' == userData.role) {
            (0, AdminController_1.showAdminOptions)(userData.id);
        }
        else if ('Chef' === userData.role) {
            (0, ChefController_1.showChefOptions)(userData.id);
        }
        else {
            (0, EmployeeController_1.showEmployeeOptions)(userData.id);
        }
    }
    catch (error) {
        console.error(error.message);
    }
}));
