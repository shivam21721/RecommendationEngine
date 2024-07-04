import { MenuItemService } from "../services/MenuItemService";
import { MenuItem } from "../models/MenuItem";

export class MenuItemController {
    private menuItemService: MenuItemService;

    constructor() {
        this.menuItemService= new MenuItemService();
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
    
}