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
exports.UserAuthenticationController = void 0;
const UserAuthenticationService_1 = require("../services/UserAuthenticationService");
class UserAuthenticationController {
    constructor() {
        this.userAuthenticationService = new UserAuthenticationService_1.UserAuthenticationService();
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.userAuthenticationService.login(username, password);
                return user;
            }
            catch (error) {
                if (error instanceof Error) {
                    throw new Error(error.message);
                }
            }
        });
    }
}
exports.UserAuthenticationController = UserAuthenticationController;
