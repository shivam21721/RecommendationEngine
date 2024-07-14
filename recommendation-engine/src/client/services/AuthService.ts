import { rejects } from 'assert';
import { resolve } from 'path';
import { Socket } from 'socket.io';
import { io } from 'socket.io-client';
export const socket = io('http://localhost:3000');
import { Response } from '../../interfaces/Interface';

export class AuthService {
    private socket;
    constructor() {
        this.socket = socket;
    }

    async login(userCredential: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('login', userCredential);
            this.socket.on('loginResponse', (response: Response<any>) => {
                if(response.status === 'success') {
                    resolve(response.data);
                }
                else {
                    reject(new Error(response.message));
                }
            })
        })
    }

    async logout() {
        this.socket.emit('logout');
    }
}