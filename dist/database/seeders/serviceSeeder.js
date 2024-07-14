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
exports.serviceSeeder = void 0;
const db_1 = require("../db");
const Service_1 = require("../models/Service");
const serviceSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const service1 = new Service_1.Service();
        service1.id = 1;
        service1.serviceName = "Personalized tattoo";
        service1.description = "Customers will have the freedom to select unique motifs and designs, personalized. Completely customize your tattoo experience according to your preferences and tastes.";
        yield service1.save();
        const service2 = new Service_1.Service();
        service2.id = 2;
        service2.serviceName = "Tattoo from catalogue";
        service2.description = "We offer tattoos based on predefined designs in our Catalogue. Customers can choose from a variety of stylish and proven options.";
        yield service2.save();
        const service3 = new Service_1.Service();
        service3.id = 3;
        service3.serviceName = "Restoration and rejuvenation of tattoos";
        service3.description = "We specialize in the restoration and rejuvenation of existing tattoos. Our experts work to improve and renew old tattoos, restoring their vitality.";
        yield service3.save();
        const service4 = new Service_1.Service();
        service4.id = 4;
        service4.serviceName = "Placement of piercings and dilators";
        service4.description = "We offer professional services for the placement of piercings and dilators. Our team ensures safe procedures and varied styles to meet individual preferences of our clients.";
        yield service4.save();
        const service5 = new Service_1.Service();
        service5.id = 5;
        service5.serviceName = "Sale of piercings and other items";
        service5.description = "In addition to our application services, we offer a selection of piercings and other items related to body art. Customers can purchase quality products for complement your unique style.";
        yield service5.save();
        console.log('===========================');
        console.log('Service seeder successfully');
        console.log('===========================');
    }
    catch (error) {
        console.log('===========================');
        console.log('ERROR Service SEEDER', error.message);
        console.log('===========================');
    }
    finally {
        yield db_1.AppDataSource.destroy();
    }
});
exports.serviceSeeder = serviceSeeder;
