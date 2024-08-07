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
exports.SocketHandler = void 0;
const AdminHandler_1 = require("./handlers/AdminHandler");
const ChefHandler_1 = require("./handlers/ChefHandler");
const EmployeeHandler_1 = require("./handlers/EmployeeHandler");
const UserAuthenticationController_1 = require("../controllers/UserAuthenticationController");
const UserRoles_1 = require("../enums/UserRoles");
class SocketHandler {
    constructor(io) {
        this.io = io;
        this.userAuthenticationController = new UserAuthenticationController_1.UserAuthenticationController();
    }
    handleConnection(socket) {
        socket.on('login', (userCredential) => __awaiter(this, void 0, void 0, function* () {
            const { username, password } = userCredential;
            const response = yield this.userAuthenticationController.login(username, password);
            socket.emit('loginResponse', response);
            if ('success' === response.status) {
                this.handleUser(socket, response.data);
            }
        }));
        socket.on('logout', () => {
            this.handleLogout(socket);
        });
    }
    handleUser(socket, user) {
        if (UserRoles_1.UserRole.Admin === user.role) {
            (0, AdminHandler_1.handleAdmin)(socket);
        }
        else if (UserRoles_1.UserRole.Chef === user.role) {
            (0, ChefHandler_1.handleChef)(socket);
        }
        else if (UserRoles_1.UserRole.Employee === user.role) {
            (0, EmployeeHandler_1.handleEmployee)(socket);
        }
    }
    ;
    handleLogout(socket) {
        socket.emit('logoutResponse');
        socket.disconnect();
    }
}
exports.SocketHandler = SocketHandler;
