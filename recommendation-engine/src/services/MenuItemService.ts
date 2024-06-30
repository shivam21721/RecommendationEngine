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

    async addMenuItem(name: string, categoryId: number,  availability: boolean, price: number): Promise<MenuItem> {
        return await this.menuItemRepository.addMenuItem(name, categoryId, availability, price);
    }

    async deleteMenuItem(id: number): Promise<void> {
        await this.menuItemRepository.deleteMenuItem(id);
    }

    async updateMenuItem(id: number, name: string, categoryId: number,  availability: boolean, price: number): Promise<void> {
        await this.menuItemRepository.updateMenuItem(id, name, categoryId, availability, price);
    }
}