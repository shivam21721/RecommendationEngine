import { MenuItemService } from "../services/MenuItemService";
import { MenuItem, Payload, Response, RolledOutMenuItem, SelectedMenuItems } from "../interfaces/Interface";
import { RecommendationService } from "../services/RecommendationService";
import { isAuthorizedUser } from "../utils/Authorization";
import { UserRole } from "../enums/UserRoles";


export class MenuItemController {
    private menuItemService: MenuItemService;
    private recommendationService: RecommendationService;

    constructor() {
        this.menuItemService= new MenuItemService();
        this.recommendationService = new RecommendationService();
    } 

    async getMenuItems(payload: Payload<null>): Promise<Response<MenuItem[] | []>> {
        try {
            if(!isAuthorizedUser(payload.userId, [UserRole.Admin, UserRole.Chef])) {
                throw new Error("Unauthorized user");
            }
            const response = await this.menuItemService.getMenuItems();
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
            if(!isAuthorizedUser(payload.userId, [UserRole.Admin])) {
                throw new Error("Unauthorized user");
            }
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

    async deleteMenuItem(payload: Payload<number>): Promise<Response<[]>> {
        try {
            if(!isAuthorizedUser(payload.userId, [UserRole.Admin])) {
                throw new Error("Unauthorized user");
            }
            const response = await this.menuItemService.deleteMenuItem(payload.data);
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

    async updateMenuItem(payload: Payload<MenuItem>): Promise<Response<[]>> {
        try {
            if(!isAuthorizedUser(payload.userId, [UserRole.Admin])) {
                throw new Error("Unauthorized user");
            }
            const response = await this.menuItemService.updateMenuItem(payload.data);
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
    
    async getTodayMenu(payload: Payload<null>): Promise<Response<any>> {
        try {
            if(!isAuthorizedUser(payload.userId, [UserRole.Employee])) {
                throw new Error("Unauthorized user");
            }
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

    async fetchRolledOutMenu(payload: Payload<null>): Promise<Response<RolledOutMenuItem[] | []>> {
        try {
            if(!isAuthorizedUser(payload.userId, [UserRole.Employee])) {
                throw new Error("Unauthorized user");
            }
            const response = await this.menuItemService.fetchRolledOutMenu(payload.userId);
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
            if(!isAuthorizedUser(payload.userId, [UserRole.Employee])) {
                throw new Error("Unauthorized user");
            }
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

    async getNextDayFinalizedMenu(payload: Payload<null>): Promise<Response<any | []>> {
        try {
            if(!isAuthorizedUser(payload.userId, [UserRole.Employee])) {
                throw new Error("Unauthorized user");
            }
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

    async getDiscardMenuItems(payload: Payload<null>) {
        try {
            if(!isAuthorizedUser(payload.userId, [UserRole.Chef, UserRole.Admin])) {
                throw new Error("Unauthorized user");
            }
            const response = await this.menuItemService.getDiscardMenuItems();
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