import { Server, Socket } from 'socket.io';
import { handleAdmin } from './handlers/AdminHandler'
import { handleChef } from './handlers/ChefHandler';
import { UserAuthenticationController } from '../controllers/UserAuthenticationController';

export class SocketHandler {
    private io: Server;
    private userAuthenticationController: UserAuthenticationController;

    constructor(io: Server) {
        this.io = io;
        this.userAuthenticationController = new UserAuthenticationController();
    }

    handleConnection(socket: Socket) {
        socket.on('login', async (userCredential) => {
            const {username, password} = userCredential;
            try {
                const user = await this.userAuthenticationController.login(username, password);
                socket.emit('loginResponse', user);
                this.handleUser(socket, user);
            } catch (error) {
                if (error instanceof Error) {
                    socket.emit('loginError', error.message);
                }
            }
        });

        socket.on('logout', () => {
            this.handleLogout(socket);
        })
    }

    private handleUser(socket: Socket, user: any) {
        if (user.role === 'Admin') {
            handleAdmin(socket, user);
        } else if (user.role === 'Chef') {
            handleChef(socket, user);
        } else if (user.role === 'Employee') {
           // handleEmployee(socket, user);
        }
    };

    private handleLogout(socket: Socket) {
        socket.emit('logoutSuccess');
        socket.disconnect();
    }
}