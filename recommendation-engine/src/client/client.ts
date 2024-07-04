//import { handleChef } from "./ChefHandler";
import { login } from "./controllers/AuthController";
import { socket } from "./services/AuthService";
// const io = require('socket.io-client');
// const readline = require('readline');

// export const socket = io('http://localhost:3000');
import { showAdminOptions } from "./controllers/AdminController";
import { User } from "../models/User";
import { showChefOptions } from "./controllers/ChefController";
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

socket.on('connect', async () => {
    console.log('Connected to server');
    const userData = await login();
    if((userData as User).role == 'Admin') {
        showAdminOptions();
    }
    else if((userData as User).role === 'Chef') {
        showChefOptions();
    }
})

// rl.on('close', () => {
//     console.log('Exiting client application');
//     socket.disconnect();
//     process.exit(0);
// })