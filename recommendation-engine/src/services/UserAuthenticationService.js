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
exports.UserAuthenticationService = void 0;
const UserAuthenticationRepository_1 = require("../repositories/UserAuthenticationRepository");
const UserRepository_1 = require("../repositories/UserRepository");
class UserAuthenticationService {
    constructor() {
        this.userAuthenticationRepository = new UserAuthenticationRepository_1.UserAuthenticationRepository();
        this.userRepository = new UserRepository_1.UserRepository;
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findUserByUsername(username);
            if (!user) {
                throw new Error('User do not Exist');
            }
            const userCredentials = yield this.userAuthenticationRepository.getUserPassword(user.id);
            if ((userCredentials === null || userCredentials === void 0 ? void 0 : userCredentials.password) !== password) {
                throw new Error('Invalid username or password');
            }
            return user;
        });
    }
}
exports.UserAuthenticationService = UserAuthenticationService;
