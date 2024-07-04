import { rejects } from 'assert';
import { resolve } from 'path';
import { Socket } from 'socket.io';
import { io } from 'socket.io-client';
export const socket = io('http://localhost:3000');

export class AuthService {
    private socket;
    constructor() {
        this.socket = socket;
    }

    async login(userCredential: any) {
        return new Promise((resolve, reject) => {
            this.socket.emit('login', userCredential);
            this.socket.on('loginResponse', (response) => {
                if(response) {
                    resolve(response);
                }
                else {
                    reject(new Error('Failed to login'));
                }
            })
        })
    }

    async logout() {
        this.socket.emit('logout');
    }
}