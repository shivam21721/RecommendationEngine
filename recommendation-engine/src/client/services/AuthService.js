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
exports.AuthService = exports.socket = void 0;
const socket_io_client_1 = require("socket.io-client");
exports.socket = (0, socket_io_client_1.io)('http://localhost:3000');
class AuthService {
    constructor() {
        this.socket = exports.socket;
    }
    login(userCredential) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.socket.emit('login', userCredential);
                this.socket.on('loginResponse', (response) => {
                    if (response.status === 'success') {
                        resolve(response.data);
                    }
                    else {
                        reject(new Error(response.message));
                    }
                });
            });
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            this.socket.emit('logout');
            this.socket.on('logoutResponse', () => {
                console.log('Exiting client application');
                exports.socket.disconnect();
                process.exit();
            });
        });
    }
}
exports.AuthService = AuthService;
