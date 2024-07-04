import { MenuItemRepository } from "../repositories/MenuItemRepository";
import { MenuItem } from "../models/MenuItem";

export class MenuItemService {
    private menuItemRepository: MenuItemRepository;

    constructor() {
        this.menuItemRepository = new MenuItemRepository();
    } 

    async getMenuItems(): Promise<MenuItem[]> {
        return await this.menuItemRepository.getAllMenuItems();
    }

    async addMenuItem(itemData: any): Promise<MenuItem> {
        return await this.menuItemRepository.addMenuItem(itemData);
    }

    async deleteMenuItem(id: number): Promise<number> {
        return await this.menuItemRepository.deleteMenuItem(id);
    }

    async updateMenuItem(itemData: any): Promise<number> {
        return await this.menuItemRepository.updateMenuItem(itemData);
    }
}