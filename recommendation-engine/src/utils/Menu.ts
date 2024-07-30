import { MealType } from "../enums/MealType";
import { MenuItem } from "../interfaces/Interface";

export function showMenu(menuItems: any) {
    if(menuItems.breakfast) {
        console.log('BREAKFAST MENU ITEMS');
        console.table(menuItems.breakfast);
    }

    if(menuItems.lunch) {
        console.log('LUNCH MENU ITEMS');
        console.table(menuItems.lunch);
    }

    if(menuItems.dinner) {
        console.log('DINNER MENU ITEMS');
        console.table(menuItems.dinner);
    }
}

export function constructMenu(menuItems: any) {
    const response: any = {};
    response.breakfast = menuItems.filter((item: any) => {
        if(MealType.BREAKFAST === item.mealType) return true;
        return false;
    });
    
    response.lunch = menuItems.filter((item: any) => {
        if(MealType.LUNCH === item.mealType) return true;
        return false;
    });

    response.dinner = menuItems.filter((item: any) => {
        if(MealType.DINNER === item.mealType) return true;
        return false;
    });
    return response;
} 

export function showCategoryBasedMenuItems(menuItems: any) {
    const breakfastItems = menuItems.filter((item: any) => {
        if('Breakfast' === item.categoryName) return true;
        return false;
    });

    const lunchAndDinnerItems = menuItems.filter((item: any) => {
        if('Breakfast' !== item.categoryName) return true;
        return false;
    });
    console.log('BREAKFAST ITEMS');
    console.table(breakfastItems);
    console.log('LUNCH AND DINNER ITEMS');
    console.table(lunchAndDinnerItems);
}

export function sortMenuItemsAccordingToUserPreference(menuItems: MenuItem[], preferredDietType: string, preferredCuisineType: string, preferredSpicyLevel: string) {
    return menuItems.sort((a, b) => {
        if (a.dietType !== b.dietType) {
            if (a.dietType === preferredDietType) return -1;
            if (b.dietType === preferredDietType) return 1;
            return a.dietType.localeCompare(b.dietType);
        }

        if (a.cuisineType !== b.cuisineType) {
            if (a.cuisineType === preferredCuisineType) return -1;
            if (b.cuisineType === preferredCuisineType) return 1;
            return a.cuisineType.localeCompare(b.cuisineType);
        }

        const spicyLevelOrder = ['Low', 'Medium', 'High'];
        if (a.spicyLevel !== b.spicyLevel) {
            if (a.spicyLevel === preferredSpicyLevel) return -1;
            if (b.spicyLevel === preferredSpicyLevel) return 1;
            return spicyLevelOrder.indexOf(a.spicyLevel) - spicyLevelOrder.indexOf(b.spicyLevel);
        }
        return 0;
    });
}