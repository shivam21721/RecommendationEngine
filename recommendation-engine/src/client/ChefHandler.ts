import { Socket } from "socket.io";
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


var chefOptions = [
    '1. VIEW MENU ITEMS',
    '2. ROLL OUT ITEMS FOR VOTING',
    '3. ROLL OUT FINALIZED ITEMS',
    '4. GENERATE REPORTS',
    '5. VIEW NOTIFICATIONS',
    '6. VIEW FEEDBACKS',
    'X. LOGOUT'
]

export function handleChef(socket:Socket, user:any) {
    handleUserPrompt(socket);

    socket.on('chefGetMenuItemsResponse', (menuItems) => {
        console.log(menuItems);
        handleUserPrompt(socket);
    })
}

function handleUserPrompt(socket: Socket) {
    showChefOptions();
    handleChefChoice(socket);
}

function showChefOptions() {
    chefOptions.forEach((option) => console.log(option));
}

function handleChefChoice(socket: Socket) {
    rl.question('Enter you Choice', (choice: string) => {
        switch (choice) {
            case '1':
                socket.emit('getMenuItems');
                break;
            case '2':
                socket.emit('rollOutNextDayItems');
                break;
            case '3':
                socket.emit('rollOutNextDayFinalizedItmes');
                break;
            case '4':
                socket.emit('generateReports');
                break;
            case '5':
                socket.emit('viewNotification');
                break;
            case '6':
                socket.emit('logout');
                break;
            default:
                console.log('Invalid Choice');
    
        }
    });
}