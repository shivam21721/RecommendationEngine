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
const UserAuthenticationController_1 = require("../controllers/UserAuthenticationController");
class SocketHandler {
    constructor(io) {
        this.io = io;
        this.userAuthenticationController = new UserAuthenticationController_1.UserAuthenticationController();
    }
    handleConnection(socket) {
        socket.on('login', (username, password) => __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userAuthenticationController.login(username, password);
                socket.emit('loginSuccess', user);
                this.handleUser(socket, user);
            }
            catch (error) {
                if (error instanceof Error) {
                    socket.emit('loginError', error.message);
                }
            }
        }));
    }
    handleUser(socket, user) {
        if (user.role === 'Admin') {
            (0, AdminHandler_1.handleAdmin)(socket, user);
        }
        else if (user.role === 'Chef') {
            //handleChef(socket, user);
        }
        else if (user.role === 'Employee') {
            // handleEmployee(socket, user);
        }
    }
}
exports.SocketHandler = SocketHandler;
