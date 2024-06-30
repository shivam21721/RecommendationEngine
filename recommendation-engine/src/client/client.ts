const io = require('socket.io-client');
const readline = require('readline');

const socket = io('http://localhost:3000');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let user;

socket.on('loginSuccess', (userData: any) => {
    user = userData;
    console.log(`Logged in as ${user.name} with role: ${user.role}`);

    if(user.role === 'Admin') {
        showAdminOptions();
    }
})

socket.on('loginError', (error: string) => {
    console.log('Login Error: ', error);
    rl.close;
})

socket.on('adminMenu', (menuOptions: any) => {
    console.log('Admin Menu');
    menuOptions.forEach((option: any) => console.log(option));
    rl.question('Enter your choice: ', (choice: string) => {
        socket.emit('adminAction', parseInt(choice));
    });
});

socket.on('prompt', (message: string) => {
    rl.question(message + ' ', (answer: string) => {
        socket.emit('addItem', answer);
    });
});

socket.on('actionResult', (result: string) => {
    console.log(result);
  });

socket.on('error', (error: string) => {
    console.error('Error:', error);
});

function login() {
    rl.question('Enter your username: ', (username: string) => {
        rl.question('Enter your password: ', (password: string) => {
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
})

rl.on('close', () => {
    console.log('Exiting clien application');
    process.exit(0);
})