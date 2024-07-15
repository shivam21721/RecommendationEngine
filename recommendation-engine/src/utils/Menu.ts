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
        if('breakfast' === item.mealType) return true;
        return false;
    });
    
    response.lunch = menuItems.filter((item: any) => {
        if('lunch' === item.mealType) return true;
        return false;
    });

    response.dinner = menuItems.filter((item: any) => {
        if('dinner' === item.mealType) return true;
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