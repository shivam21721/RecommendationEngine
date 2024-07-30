import { MenuItemRepository } from "../repositories/MenuItemRepository";
import { UserRepository } from "../repositories/UserRepository";
import { DiscardMenuItem, MenuItem, Response, RolledOutMenuItem, SelectedMenuItems } from "../interfaces/Interface";
import { constructMenu, sortMenuItemsAccordingToUserPreference } from "../utils/Menu";
import { NotificationService } from "./NotificationService";

export class MenuItemService {
    private menuItemRepository: MenuItemRepository;
    private notificationService: NotificationService;
    private userRepository: UserRepository;

    constructor() {
        this.menuItemRepository = new MenuItemRepository();
        this.notificationService = new NotificationService();
        this.userRepository = new UserRepository();
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

    async addMenuItem(itemData: MenuItem): Promise<Response<[]>> {
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

    async updateMenuItem(itemData: MenuItem): Promise<Response<[]>> {
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

    async fetchRolledOutMenu(userId: number): Promise<Response<RolledOutMenuItem[]>> {
        try {
            const menuItems =  await this.menuItemRepository.fetchRolledOutMenu();
            const {preferredSpicyLevel, preferredDietType, preferredCuisineType} = await this.userRepository.getUserMenuItemPreferences(userId);
            
            const sortedMenuItems = sortMenuItemsAccordingToUserPreference(menuItems as MenuItem[], preferredDietType, preferredCuisineType, preferredSpicyLevel);
            
            const mealTypeBasedMenuItems = constructMenu(sortedMenuItems);
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
            var breakfastItems = items.breakfast.map((id: number) => {
                return {id, mealType: 'breakfast'};
            });

            var lunchItems = items.lunch.map((id: number) => {
                return {id, mealType: 'lunch'};
            });

            var dinnerItems = items.dinner.map((id: number) => {
                return {id, mealType: 'dinner'};
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

    async getDiscardMenuItems() {
        try {
            const discardMenuItems = await this.menuItemRepository.getDiscardMenuItems();
            const response: Response<DiscardMenuItem[]> =  {
                status: 'success',
                message: 'Successfully fetched Discard Menu Items',
                data: discardMenuItems
            };
            return response;
        } catch (error) {
            throw error;
        } 
    }
}