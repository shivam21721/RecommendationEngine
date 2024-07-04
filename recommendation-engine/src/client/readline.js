"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncUserInput = exports.rl = void 0;
const readline_1 = __importDefault(require("readline"));
exports.rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
function asyncUserInput(query) {
    return new Promise((resolve) => {
        exports.rl.question(query, resolve);
    });
}
exports.asyncUserInput = asyncUserInput;
