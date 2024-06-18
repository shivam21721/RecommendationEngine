import { Socket } from 'socket.io';

export function handleAdmin(socket: Socket, user: any) {
    socket.emit('adminMenu', [
        '1. Add Menu Item',
        '2. Delete Menu Item',
        '3. Update Menu Item',
        'Enter the number to select an action:'
    ]);

    socket.on('adminAction', async (action: number) => {
        switch (action) {
            case 1: 
                socket.emit('prompt', 'Shree Ganeshaya Namaha');
            case 2: 
                socket.emit('prompt', 'Shree Ganeshaya Namaha');
            case 3: 
                socket.emit('prompt', 'Shree Ganeshaya Namaha');
            default:
                socket.emit('error', 'Invalid Action');
        }
    });
}