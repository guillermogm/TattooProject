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
const appointmentSeeder_1 = require("./appointmentSeeder");
const roleSeeder_1 = require("./roleSeeder");
const serviceSeeder_1 = require("./serviceSeeder");
const userSeeder_1 = require("./userSeeder");
(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Starting seeders...");
    yield (0, roleSeeder_1.roleSeeder)();
    yield (0, serviceSeeder_1.serviceSeeder)();
    yield (0, userSeeder_1.userSeeder)();
    yield (0, appointmentSeeder_1.appointmentSeeder)();
}))();
