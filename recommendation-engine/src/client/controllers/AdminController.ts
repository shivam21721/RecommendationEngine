import { socket } from "../services/AuthService";
import { rl } from "../readline";
import { MenuItemService } from "../services/MenuItemService";

const adminOptions = [
    '1. ADD MENU ITEM',
    '2. DELETE MENU ITEM',
    '3. UPDATE MENU ITEM',
    '4. VIEW MENU ITEM'
];

const menuItemService = new MenuItemService(socket);

export async function showAdminOptions() {
    adminOptions.forEach((option) => {
        console.log(option);
    })

    rl.question('Enter Your Choice: ', (choice: string) => {
        handleAdminChoice(choice);
    })
}

async function handleAdminChoice(choice: string) {
    switch (choice) {
        case '1':
            try {
                rl.question('Enter item name, category, availability (true/false), and price: ', async (itemData: string) => {
                    const [name, categoryId, availability, price] = itemData.split(',');
                    const response = await menuItemService.addMenuItem({name, categoryId, availability, price: parseFloat(price) });
                    console.log('Item Successfully added, item ID: ' + response);
                    showAdminOptions();
                });
                break;
            } catch(error) {
                console.log('Error: ', error);
            }

        case '2': 
            try {
                rl.question('Enter item ID to delete: ', async (itemId: string) => {
                    const response = await menuItemService.deleteMenuItem(parseInt(itemId));
                    console.log('Item Successfully delete, item ID: '+response);
                    showAdminOptions();
                });
            } catch(error) {
                console.log('Error: ', error);
            }
            break;

        case '3':
            try {
                rl.question('Enter item ID, new name, new category, new price, and new availability (true/false):', async (itemData: string) => {
                    const [id, name, categoryId, availability, price] = itemData.split(',');
                    const response = await menuItemService.updateMenuItem({id, name, categoryId, availability, price: parseFloat(price)});
                    console.log('Item Successfully Updated' + response);
                    showAdminOptions();
                });
            } catch(error) {
                console.log('Error: ', error);
            }
            break;

        case '4': 
            try {
                const response = await menuItemService.getMenuItems();
                console.log(response);
                showAdminOptions();
            } catch(error) {
                console.log('Error: ', error);
            }
            break;
    }
};