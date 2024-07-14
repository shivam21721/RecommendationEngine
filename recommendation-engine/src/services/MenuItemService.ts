import { MenuItemRepository } from "../repositories/MenuItemRepository";
import { MenuItem, Response, RolledOutMenuItem } from "../interfaces/Interface";
import { constructMenu } from "../utils/Menu";

export class MenuItemService {
    private menuItemRepository: MenuItemRepository;

    constructor() {
        this.menuItemRepository = new MenuItemRepository();
    } 

    async getMenuItems(): Promise<Response<MenuItem[]>> {
        try {
            const menuItems = await this.menuItemRepository.getAllMenuItems();
            const response: Response<MenuItem[]> = {
                status: 'success',
                message: 'Successfully fetched all the menu Items',
                data: menuItems
            };
            return response;
        } catch(error) {
            throw error;
        }
    }

    async addMenuItem(itemData: any): Promise<Response<[]>> {
        try {
            const menuItemId = await this.menuItemRepository.addMenuItem(itemData);
            const response: Response<[]> =  {
                status: 'success',
                message: `Menu Item Successfully added with id: ${menuItemId}`,
                data: []
            };
            return response;
        } catch(error) {
            throw error;
        }
        
    }

    async deleteMenuItem(id: number): Promise<Response<[]>> {
        try {
            const deletedItemId = await this.menuItemRepository.deleteMenuItem(id);
            const response: Response<[]> =  {
                status: 'success',
                message: `Menu Item Successfully Deleted with id: ${deletedItemId}`,
                data: []
            };
            return response;
        } catch(error) {
            throw error;
        }
        
    }

    async updateMenuItem(itemData: any): Promise<Response<[]>> {
        try {
            const updatedItemId = await this.menuItemRepository.updateMenuItem(itemData);
            const response: Response<[]> =  {
                status: 'success',
                message: `Menu Item Successfully Deleted with id: ${updatedItemId}`,
                data: []
            };
            return response;
        } catch(error) {
            throw error;
        }
    }

    async fetchRolledOutMenu(): Promise<Response<RolledOutMenuItem[]>> {
        try {
            const menuItems =  await this.menuItemRepository.fetchRolledOutMenu();
            const mealTypeBasedMenuItems = constructMenu(menuItems);
            const response: Response<RolledOutMenuItem[]> =  {
                status: 'success',
                message: `Successfully fetched the menu items`,
                data: mealTypeBasedMenuItems as RolledOutMenuItem[]
            };
            return response;
        } catch(error) {
            throw error;
        }
    }

    async updateVotedMenuItems(itemIds: any): Promise<Response<[]>> {
        try {
            const updatedItemsCount = this.menuItemRepository.updateVotedMenuItems(itemIds);
            const response: Response<[]> =  {
                status: 'success',
                message: `${updatedItemsCount}Items successfully voted`,
                data: []
            };
            return response;
        } catch (error) {
            throw error;
        }  
    }
}