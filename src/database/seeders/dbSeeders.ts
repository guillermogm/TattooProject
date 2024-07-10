import { roleSeeder } from "./roleSeeder";

(async () => { 
    console.log("Starting seeders...")
    await roleSeeder();
    
})();