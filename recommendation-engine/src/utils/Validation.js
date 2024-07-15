"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.areAllItemsUnique = exports.isValidNumber = void 0;
function isValidNumber(id) {
    const regex = /^[1-9]\d*$/;
    return regex.test(id);
}
exports.isValidNumber = isValidNumber;
function areAllItemsUnique(menuItems) {
    const uniqueElements = new Set(menuItems);
    return uniqueElements.size === menuItems.length;
}
exports.areAllItemsUnique = areAllItemsUnique;
