import { roleSeeder } from "./roleSeeder";
import { serviceSeeder } from "./serviceSeeder";
import { userSeeders } from "./userSeeder";

(async () => { 
    console.log("Starting seeders...")
    await roleSeeder();
    await serviceSeeder();
    await userSeeders();
    
})();