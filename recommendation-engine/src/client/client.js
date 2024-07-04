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
//import { handleChef } from "./ChefHandler";
const AuthController_1 = require("./controllers/AuthController");
const AuthService_1 = require("./services/AuthService");
// const io = require('socket.io-client');
// const readline = require('readline');
// export const socket = io('http://localhost:3000');
const AdminController_1 = require("./controllers/AdminController");
const ChefController_1 = require("./controllers/ChefController");
// export const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
let user;
// socket.on('loginSuccess', (userData: any) => {
//     user = userData;
//     console.log(`Logged in as ${user.name} with role: ${user.role}`);
//     if(user.role === 'Admin') {
//         showAdminOptions();
//     } else if (user.role === 'Chef') {
//         //handleChef(socket, user);
//     }
// })
// socket.on('loginError', (error: string) => {
//     console.log('Login Error: ', error);
//     rl.close;
// })
// var adminChoices: any;
// const showAdminChoices = () => {
//     adminChoices.forEach((option: any) => console.log(option));
//         rl.question('Enter your choice: ', (choice: string) => {
//             if(choice === 'X') {
//                 socket.emit('logout');
//                 rl.close();
//             } else {
//                 socket.emit('adminAction', parseInt(choice));
//             }
//         });
// }
// socket.on('adminChoices', (choices: any) => {
//     adminChoices = choices;
//     showAdminChoices();
// });
// socket.on('prompt', (message: string) => {
//     rl.question(message + ' ', (answer: string) => {
//         socket.emit('addItem', answer);
//     });
// });
// socket.on('prompt1', (message: string) => {
//     rl.question(message + ' ', (answer: string) => {
//         socket.emit('deleteItem', answer);
//     });
// });
// socket.on('prompt3', (message: string) => {
//     rl.question(message + ' ', (answer: string) => {
//         socket.emit('updateItem', answer);
//     });
// });
// socket.on('actionResult', (result: string) => {
//     console.log(result);
//     showAdminChoices();
//   });
// socket.on('error', (error: string) => {
//     console.error('Error:', error);
// });
// function login() {
//     rl.question('Enter your username: ', (username: string) => {
//         rl.question('Enter your password: ', (password: string) => {
//             socket.emit('login', username, password);
//         });
//     });
// }
// function getAdminChoices() {
//     socket.emit('adminChoices');
// }
AuthService_1.socket.on('connect', () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Connected to server');
    const userData = yield (0, AuthController_1.login)();
    if (userData.role == 'Admin') {
        (0, AdminController_1.showAdminOptions)();
    }
    else if (userData.role === 'Chef') {
        (0, ChefController_1.showChefOptions)();
    }
}));
// rl.on('close', () => {
//     console.log('Exiting client application');
//     socket.disconnect();
//     process.exit(0);
// })
