"use strict";
const io = require('socket.io-client');
const readline = require('readline');
const socket = io('http://localhost:3000');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
let user;
socket.on('loginSuccess', (userData) => {
    user = userData;
    console.log(`Logged in as ${user.name} with role: ${user.role_id}`);
    if (user.role === 'Admin') {
        showAdminOptions();
    }
});
socket.on('loginError', (error) => {
    console.log('Login Error: ', error);
    rl.close;
});
socket.on('adminMenu', (menuOptions) => {
    console.log('Admin Menu');
    menuOptions.forEach((option) => console.log(option));
    rl.question('Enter your choice: ', (choice) => {
        socket.emit('adminAction', parseInt(choice));
    });
});
socket.on('prompt', (message) => {
    rl.question(message + ' ', (answer) => {
        socket.emit('addItem', answer);
    });
});
socket.on('actionResult', (result) => {
    console.log(result);
});
socket.on('error', (error) => {
    console.error('Error:', error);
});
function login() {
    rl.question('Enter your username: ', (username) => {
        rl.question('Enter your password: ', (password) => {
            socket.emit('login', username, password);
        });
    });
}
function showAdminOptions() {
    socket.emit('adminMenu');
}
socket.on('connect', () => {
    console.log('Connected to server');
    login();
});
rl.on('close', () => {
    console.log('Exiting clien application');
    process.exit(0);
});
