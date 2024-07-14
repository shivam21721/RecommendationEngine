export interface QueryResult {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
};

export interface MenuItem {
    id: number;
    name: string;
    categoryId: number;
    price: number;
    availability: boolean;
};

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
};

export interface UserAuthentication {
    user_id: number;
    password: string;
};

export interface Response<T> {
    status: string;
    message: string;
    data: T;
};

export interface RolledOutMenuItem {
    menuItemId: number,
    menuItemName: string,
    categoryName: string,
    menuItemPrice: number,
    mealType: string
    averageRating: number,
    averageSentimentScore: number
};

export interface Notification {
    message: string,
    date: Date
};

export interface RecommendedMenu {
    menuId: number,
    menuName: string,
    categoryName: string,
    avgRating: number,
    avgSentiment: number,
    preparedCount: number,
    priorityScore: number
};