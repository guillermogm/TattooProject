import { appointmentSeeder } from "./appointmentSeeder";
import { roleSeeder } from "./roleSeeder";
import { serviceSeeder } from "./serviceSeeder";
import { userSeeder } from "./userSeeder";

(async () => { 
    console.log("Starting seeders...")
    await roleSeeder();
    await serviceSeeder();
    await userSeeder();
    await appointmentSeeder(); 
})();