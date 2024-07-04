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
exports.login = void 0;
const AuthService_1 = require("../services/AuthService");
const readline_1 = require("../readline");
//import { rl } from "../client";
const authService = new AuthService_1.AuthService();
function login() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const username = yield (0, readline_1.asyncUserInput)('Enter your username: ');
            const password = yield (0, readline_1.asyncUserInput)('Enter your password: ');
            const userData = yield authService.login({ username, password });
            return userData;
        }
        catch (error) {
            return error;
        }
    });
}
exports.login = login;
;
