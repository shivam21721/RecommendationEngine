"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showCategoryBasedMenuItems = exports.constructMenu = exports.showMenu = void 0;
function showMenu(menuItems) {
    if (menuItems.breakfast) {
        console.log('BREAKFAST MENU ITEMS');
        console.table(menuItems.breakfast);
    }
    if (menuItems.lunch) {
        console.log('LUNCH MENU ITEMS');
        console.table(menuItems.lunch);
    }
    if (menuItems.dinner) {
        console.log('DINNER MENU ITEMS');
        console.table(menuItems.dinner);
    }
}
exports.showMenu = showMenu;
function constructMenu(menuItems) {
    const response = {};
    response.breakfast = menuItems.filter((item) => {
        if ('breakfast' === item.mealType)
            return true;
        return false;
    });
    response.lunch = menuItems.filter((item) => {
        if ('lunch' === item.mealType)
            return true;
        return false;
    });
    response.dinner = menuItems.filter((item) => {
        if ('dinner' === item.mealType)
            return true;
        return false;
    });
    return response;
}
exports.constructMenu = constructMenu;
function showCategoryBasedMenuItems(menuItems) {
    const breakfastItems = menuItems.filter((item) => {
        if ('Breakfast' === item.categoryName)
            return true;
        return false;
    });
    const lunchAndDinnerItems = menuItems.filter((item) => {
        if ('Breakfast' !== item.categoryName)
            return true;
        return false;
    });
    console.log('BREAKFAST ITEMS');
    console.table(breakfastItems);
    console.log('LUNCH AND DINNER ITEMS');
    console.table(lunchAndDinnerItems);
}
exports.showCategoryBasedMenuItems = showCategoryBasedMenuItems;
