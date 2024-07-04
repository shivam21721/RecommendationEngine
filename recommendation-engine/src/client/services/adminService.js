"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showAdminChoices = void 0;
const adminChoices = [
    '1. ADD MENU ITEM',
    '2. DELETE MENU ITEM',
    '3. UPDATE MENU ITEM',
    '4. VIEW MENU ITEM'
];
function showAdminChoices() {
    adminChoices.forEach((choice) => console.log(choice));
}
exports.showAdminChoices = showAdminChoices;
