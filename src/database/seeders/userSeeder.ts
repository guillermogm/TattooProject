import { AppDataSource } from "../db";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export const userSeeder = async () => {
    try {
        await AppDataSource.initialize()

        const users = [
            { firstName: "William", lastName: "Smith", email: "william@william.com", password: "123456789", roleId: "3" },
            { firstName: "Emily", lastName: "Johnson", email: "emily@emily.com", password: "123456789", roleId: "2" },
            { firstName: "Michael", lastName: "Davis", email: "michael@michael.com", password: "123456789", roleId: "1" },
            { firstName: "Hannah", lastName: "Miller", email: "hannah@hannah.com", password: "123456789", roleId: "1" },
            { firstName: "Sarah", lastName: "Wilson", email: "sarah@sarah.com", password: "123456789", roleId: "1" },
            { firstName: "John", lastName: "Moore", email: "john@john.com", password: "123456789", roleId: "1" },
            { firstName: "Jessica", lastName: "Taylor", email: "jessica@jessica.com", password: "123456789", roleId: "1" },
            { firstName: "James", lastName: "Anderson", email: "james@james.com", password: "123456789", roleId: "1" },
            { firstName: "Olivia", lastName: "Thomas", email: "olivia@olivia.com", password: "123456789", roleId: "1" },
            { firstName: "Benjamin", lastName: "Jackson", email: "benjamin@benjamin.com", password: "123456789", roleId: "1" },
            { firstName: "Abigail", lastName: "White", email: "abigail@abigail.com", password: "123456789", roleId: "1" },
            { firstName: "Alexander", lastName: "Harris", email: "alexander@alexander.com", password: "123456789", roleId: "1" },
            { firstName: "Isabella", lastName: "Martin", email: "isabella@isabella.com", password: "123456789", roleId: "1" },
            { firstName: "Elijah", lastName: "Thompson", email: "elijah@elijah.com", password: "123456789", roleId: "1" },
            { firstName: "Ava", lastName: "Garcia", email: "ava@ava.com", password: "123456789", roleId: "1" }
          ]
        const newUsers = await createUsers(users);

        await User.save(newUsers);

        console.log('===========================');
        console.log('Users seeder successfully');
        console.log('===========================');

    } catch (error: any) {

        console.log('===========================');
        console.log('ERROR Users SEEDER', error.message);
        console.log('===========================');

    } finally {
        await AppDataSource.destroy();
    }
}

const createUsers = async (users: any) => {  
    const newUsers: User[] = []
  
    users.forEach((element: User, index: number) => {    
      const user = new User();
      user.id = index + 1;
      user.firstName = element.firstName;
      user.lastName = element.lastName;
      user.email=element.email;
      user.password=bcrypt.hashSync(element.password, 10)
      user.roleId=element.roleId
      newUsers.push(user)
    });
  
    return newUsers;
  }