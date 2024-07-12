import { MenuItemService } from "../services/MenuItemService";
import { MenuItem } from "../models/MenuItem";
import { RecommendationService } from "../services/RecommendationService";

export class MenuItemController {
    private menuItemService: MenuItemService;
    private recommendationService: RecommendationService;

    constructor() {
        this.menuItemService= new MenuItemService();
        this.recommendationService = new RecommendationService();
    } 

    async getMenuItems(): Promise<MenuItem[]> {
        return await this.menuItemService.getMenuItems();
    }

    async addMenuItem(itemData: any): Promise<MenuItem> {
        return await this.menuItemService.addMenuItem(itemData);
    }

    async deleteMenuItem(id: number): Promise<number> {
        return await this.menuItemService.deleteMenuItem(id);
    }

    async updateMenuItem(itemData: any): Promise<number> {
        return await this.menuItemService.updateMenuItem(itemData);
    }
    
    async getTodayMenu() {
        const response = await this.recommendationService.getPreparedMenuForToday();
        return response;
    }

    async fetchRolledOutMenu() {
        const response = await this.menuItemService.fetchRolledOutMenu();
        return response;
    }

    async updateVotedMenuItems(itemIds: any) {
        const response = await this.menuItemService.updateVotedMenuItems(itemIds);
        return response;
    }

    async getNextDayFinalizedMenu() {
        try {
            const menuItems = await this.recommendationService.getNextDayFinalizedMenu();
            return menuItems;
        } catch(error) {
            console.log(error);
        }
    }
}