export interface QueryResult {
    fieldCount: number;
    affectedRows: number;
    insertId: number;
    info: string;
    serverStatus: number;
    warningStatus: number;
};

export interface MenuItem {
    id?: number;
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
    menuItemId: number;
    menuItemName: string;
    categoryName: string;
    menuItemPrice: number;
    mealType: string;
    averageRating: number;
    averageSentimentScore: number;
};

export interface Notification {
    message: string;
    date: Date;
    type?: number
};

export interface RecommendedMenu {
    menuId: number;
    menuName: string;
    categoryName: string;
    avgRating: number;
    avgSentiment: number;
    preparedCount: number;
    priorityScore: number;
};

export interface Payload<T> {
    userId: number;
    data: T;
}

export interface FinalizedMenuItem {
    menuItemId: number;
    menuItemName: string;
    categoryName: string;
    voteCount: number;
    mealType: string;
    avgRating: number;
    avgSentiment: number;
    preparedCount: number;
    priorityScore: number;
};

export interface SelectedMenuItems {
    breakfast: number[];
    lunch: number[];
    dinner: number[];
};

export interface MenuRecommendation {
    id: number;
    mealType: string;
    date: string;
};

export interface Feedback {
    userId: number;
    menuItemId: number;
    comment: string;
    rating: number;
    feedbackDate?: string;
    sentimentScore?: number;
}

export interface VotedMenuItem {
    id: number;
    mealType: string;
}

export interface PreparedItem {
    id: number;
    mealType: string;
}