import { MenuItemService } from "../services/MenuItemService";
import { MenuItem, Payload, Response, RolledOutMenuItem, SelectedMenuItems } from "../interfaces/Interface";
import { RecommendationService } from "../services/RecommendationService";


export class MenuItemController {
    private menuItemService: MenuItemService;
    private recommendationService: RecommendationService;

    constructor() {
        this.menuItemService= new MenuItemService();
        this.recommendationService = new RecommendationService();
    } 

    async getMenuItems(): Promise<Response<MenuItem[] | []>> {
        try {
            console.log('inside');
            const response = await this.menuItemService.getMenuItems();
            console.log(response);
            return response;
        } catch (error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }

    async addMenuItem(payload: Payload<MenuItem>): Promise<Response<[]>> {
        try {
            const response = await this.menuItemService.addMenuItem(payload.data);
            return response;
        } catch(error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }

    async deleteMenuItem(id: number): Promise<Response<[]>> {
        try {
            const response = await this.menuItemService.deleteMenuItem(id);
            return response;
        } catch(error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }

    async updateMenuItem(itemData: any): Promise<Response<[]>> {
        try {
            const response = await this.menuItemService.updateMenuItem(itemData);
            return response;
        } catch(error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
         
    }
    
    async getTodayMenu(): Promise<Response<any>> {
        try {
            const response = await this.recommendationService.getPreparedMenuForToday();
            return response;
        } catch(error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }

    async fetchRolledOutMenu(): Promise<Response<RolledOutMenuItem[] | []>> {
        try {
            const response = await this.menuItemService.fetchRolledOutMenu();
            return response;
        } catch(error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }

    async updateVotedMenuItems(payload: Payload<SelectedMenuItems>): Promise<Response<[]>> {
        try {
            const response = await this.menuItemService.updateVotedMenuItems(payload.data);
            return response;    
        } catch(error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }

    async getNextDayFinalizedMenu(): Promise<Response<any | []>> {
        try {
            const response = await this.recommendationService.getNextDayFinalizedMenu();
            return response;
        } catch(error) {
            console.error(error);
            const response: Response<[]> = {
                status: 'error',
                message: (error as Error).message,
                data: []
            }
            return response;
        }
    }
}