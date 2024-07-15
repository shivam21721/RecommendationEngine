import { MenuItemRepository } from "../repositories/MenuItemRepository";
import { MenuItem, Response, RolledOutMenuItem, SelectedMenuItems } from "../interfaces/Interface";
import { constructMenu } from "../utils/Menu";
import { NotificationService } from "./NotificationService";

export class MenuItemService {
    private menuItemRepository: MenuItemRepository;
    private notificationService: NotificationService;

    constructor() {
        this.menuItemRepository = new MenuItemRepository();
        this.notificationService = new NotificationService();
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
            await this.notificationService.sendNotificationToChef(`New menu item added, item id: ${menuItemId}`);
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
            await this.notificationService.sendNotificationToChef(`Menu Item Deleted, item id: ${deletedItemId}`);
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
            await this.notificationService.sendNotificationToChef(`Menu Item Updated, item id: ${updatedItemId}`);
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

    async updateVotedMenuItems(items: SelectedMenuItems): Promise<Response<[]>> {
        try {
            var breakfastItems = items.breakfast.map((id: any) => {
                return {id: parseInt(id), mealType: 'breakfast'};
            });

            var lunchItems = items.lunch.map((id: any) => {
                return {id: parseInt(id), mealType: 'lunch'};
            });

            var dinnerItems = items.dinner.map((id: any) => {
                return {id: parseInt(id), mealType: 'dinner'};
            });
            const updatedItemsCount = this.menuItemRepository.updateVotedMenuItems([...breakfastItems, ...lunchItems, ...dinnerItems]);
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