import { Server, Socket } from 'socket.io';
import { handleAdmin } from './handlers/AdminHandler'
import { handleChef } from './handlers/ChefHandler';
import { handleEmployee } from './handlers/EmployeeHandler';
import { UserAuthenticationController } from '../controllers/UserAuthenticationController';
import { User } from '../interfaces/Interface';
import { UserRole } from '../enums/UserRoles';

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
            const response = await this.userAuthenticationController.login(username, password);
            socket.emit('loginResponse', response);
            if('success' === response.status) {
                this.handleUser(socket, response.data as User);
            }
        }
        );
        socket.on('logout', () => {
            this.handleLogout(socket);
        })
    }

    private handleUser(socket: Socket, user: User) {
        if (UserRole.Admin === user.role) {
            handleAdmin(socket, user);
        } else if (UserRole.Chef === user.role) {
            handleChef(socket, user);
        } else if (UserRole.Employee === user.role) {
            handleEmployee(socket, user);
        }
    };

    private handleLogout(socket: Socket) {
        socket.emit('logoutResponse');
        socket.disconnect();
    }
}