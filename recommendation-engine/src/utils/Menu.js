"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortMenuItemsAccordingToUserPreference = exports.showCategoryBasedMenuItems = exports.constructMenu = exports.showMenu = void 0;
const MealType_1 = require("../enums/MealType");
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
        if (MealType_1.MealType.BREAKFAST === item.mealType)
            return true;
        return false;
    });
    response.lunch = menuItems.filter((item) => {
        if (MealType_1.MealType.LUNCH === item.mealType)
            return true;
        return false;
    });
    response.dinner = menuItems.filter((item) => {
        if (MealType_1.MealType.DINNER === item.mealType)
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
function sortMenuItemsAccordingToUserPreference(menuItems, preferredDietType, preferredCuisineType, preferredSpicyLevel) {
    return menuItems.sort((a, b) => {
        if (a.dietType !== b.dietType) {
            if (a.dietType === preferredDietType)
                return -1;
            if (b.dietType === preferredDietType)
                return 1;
            return a.dietType.localeCompare(b.dietType);
        }
        if (a.cuisineType !== b.cuisineType) {
            if (a.cuisineType === preferredCuisineType)
                return -1;
            if (b.cuisineType === preferredCuisineType)
                return 1;
            return a.cuisineType.localeCompare(b.cuisineType);
        }
        const spicyLevelOrder = ['Low', 'Medium', 'High'];
        if (a.spicyLevel !== b.spicyLevel) {
            if (a.spicyLevel === preferredSpicyLevel)
                return -1;
            if (b.spicyLevel === preferredSpicyLevel)
                return 1;
            return spicyLevelOrder.indexOf(a.spicyLevel) - spicyLevelOrder.indexOf(b.spicyLevel);
        }
        return 0;
    });
}
exports.sortMenuItemsAccordingToUserPreference = sortMenuItemsAccordingToUserPreference;
