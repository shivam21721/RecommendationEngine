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
exports.handleAdmin = void 0;
function handleAdmin(socket, user) {
    socket.emit('adminMenu', [
        '1. Add Menu Item',
        '2. Delete Menu Item',
        '3. Update Menu Item',
        'Enter the number to select an action:'
    ]);
    socket.on('adminAction', (action) => __awaiter(this, void 0, void 0, function* () {
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
    }));
}
exports.handleAdmin = handleAdmin;
