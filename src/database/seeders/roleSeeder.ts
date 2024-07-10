import { AppDataSource } from "../db";
import { Role } from "../models/Role";


export const roleSeeder = async () => {
    try {
        await AppDataSource.initialize()

        const user = new Role();

        user.id = 1;
        user.name = "user"

        await user.save()

        const admin = new Role();

        admin.id = 2;
        admin.name = "admin"

        await admin.save()

        const superAdmin = new Role();

        superAdmin.id = 3;
        superAdmin.name = "super_admin"

        await superAdmin.save()


        console.log('===========================');
        console.log('Role seeder successfully');
        console.log('===========================');

    } catch (error: any) {

        console.log('===========================');
        console.log('ERROR Role SEEDER', error.message);
        console.log('===========================');

    } finally {
        await AppDataSource.destroy();
    }
}