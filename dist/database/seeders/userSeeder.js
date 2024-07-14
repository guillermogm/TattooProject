"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSeeder = void 0;
const db_1 = require("../db");
const User_1 = require("../models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
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
        ];
        const newUsers = yield createUsers(users);
        yield User_1.User.save(newUsers);
        console.log('===========================');
        console.log('Users seeder successfully');
        console.log('===========================');
    }
    catch (error) {
        console.log('===========================');
        console.log('ERROR Users SEEDER', error.message);
        console.log('===========================');
    }
    finally {
        yield db_1.AppDataSource.destroy();
    }
});
exports.userSeeder = userSeeder;
const createUsers = (users) => __awaiter(void 0, void 0, void 0, function* () {
    const newUsers = [];
    users.forEach((element, index) => {
        const user = new User_1.User();
        user.id = index + 1;
        user.firstName = element.firstName;
        user.lastName = element.lastName;
        user.email = element.email;
        user.password = bcrypt_1.default.hashSync(element.password, 10);
        user.roleId = element.roleId;
        newUsers.push(user);
    });
    return newUsers;
});
