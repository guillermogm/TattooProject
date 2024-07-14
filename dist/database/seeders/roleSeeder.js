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
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleSeeder = void 0;
const db_1 = require("../db");
const Role_1 = require("../models/Role");
const roleSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const user = new Role_1.Role();
        user.id = 1;
        user.name = "user";
        yield user.save();
        const admin = new Role_1.Role();
        admin.id = 2;
        admin.name = "admin";
        yield admin.save();
        const superAdmin = new Role_1.Role();
        superAdmin.id = 3;
        superAdmin.name = "super_admin";
        yield superAdmin.save();
        console.log('===========================');
        console.log('Role seeder successfully');
        console.log('===========================');
    }
    catch (error) {
        console.log('===========================');
        console.log('ERROR Role SEEDER', error.message);
        console.log('===========================');
    }
    finally {
        yield db_1.AppDataSource.destroy();
    }
});
exports.roleSeeder = roleSeeder;
