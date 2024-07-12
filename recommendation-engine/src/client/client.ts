import { login } from "./controllers/AuthController";
import { socket } from "./services/AuthService";
import { showAdminOptions } from "./controllers/AdminController";
import { User } from "../models/User";
import { showChefOptions } from "./controllers/ChefController";
import { showEmployeeOptions } from "./controllers/EmployeeController";

socket.on('connect', async () => {
    console.log('Connected to server');
    const userData = await login();
    if((userData as User).role == 'Admin') {
        showAdminOptions();
    }
    else if((userData as User).role === 'Chef') {
        showChefOptions((userData as User).id);
    } else {
        showEmployeeOptions((userData as User).id);
    }
});
