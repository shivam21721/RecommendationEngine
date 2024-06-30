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

    async addMenuItem(name: string, categoryId: number,  availability: boolean, price: number): Promise<MenuItem> {
        return await this.menuItemService.addMenuItem(name, categoryId, availability, price);
    }

    async deleteMenuItem(id: number): Promise<void> {
        await this.menuItemService.deleteMenuItem(id);
    }

    async updateMenuItem(id: number, name: string, categoryId: number,  availability: boolean, price: number): Promise<void> {
        await this.menuItemService.updateMenuItem(id, name, categoryId, availability, price);
    }
    
}