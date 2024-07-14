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
exports.appointmentSeeder = void 0;
const db_1 = require("../db");
const Appointment_1 = require("../models/Appointment");
const appointmentSeeder = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.AppDataSource.initialize();
        const appointments = [
            { "appointmentDate": "2024-07-30 20:21:00", "userId": "1", "serviceId": "4" },
            { "appointmentDate": "2024-07-31 10:30:00", "userId": "3", "serviceId": "2" },
            { "appointmentDate": "2024-08-01 14:45:00", "userId": "5", "serviceId": "1" },
            { "appointmentDate": "2024-08-02 16:00:00", "userId": "2", "serviceId": "5" },
            { "appointmentDate": "2024-08-03 11:15:00", "userId": "7", "serviceId": "3" },
            { "appointmentDate": "2024-08-04 13:30:00", "userId": "9", "serviceId": "2" },
            { "appointmentDate": "2024-08-05 15:45:00", "userId": "11", "serviceId": "1" },
            { "appointmentDate": "2024-08-06 17:00:00", "userId": "13", "serviceId": "4" },
            { "appointmentDate": "2024-08-07 10:15:00", "userId": "1", "serviceId": "3" },
            { "appointmentDate": "2024-08-08 12:30:00", "userId": "4", "serviceId": "2" },
            { "appointmentDate": "2024-08-09 14:45:00", "userId": "6", "serviceId": "1" },
            { "appointmentDate": "2024-08-10 16:00:00", "userId": "8", "serviceId": "5" },
            { "appointmentDate": "2024-08-11 11:15:00", "userId": "10", "serviceId": "3" },
            { "appointmentDate": "2024-08-12 13:30:00", "userId": "12", "serviceId": "2" },
            { "appointmentDate": "2024-08-13 15:45:00", "userId": "14", "serviceId": "1" },
            { "appointmentDate": "2024-08-14 17:00:00", "userId": "15", "serviceId": "4" },
            { "appointmentDate": "2024-08-15 10:15:00", "userId": "2", "serviceId": "3" },
            { "appointmentDate": "2024-08-16 12:30:00", "userId": "5", "serviceId": "2" },
            { "appointmentDate": "2024-08-17 14:45:00", "userId": "7", "serviceId": "1" },
            { "appointmentDate": "2024-08-18 16:00:00", "userId": "9", "serviceId": "5" },
            { "appointmentDate": "2024-08-19 11:15:00", "userId": "11", "serviceId": "3" },
            { "appointmentDate": "2024-08-20 13:30:00", "userId": "13", "serviceId": "2" },
            { "appointmentDate": "2024-08-21 15:45:00", "userId": "1", "serviceId": "1" },
            { "appointmentDate": "2024-08-22 17:00:00", "userId": "4", "serviceId": "4" },
            { "appointmentDate": "2024-08-23 10:15:00", "userId": "6", "serviceId": "3" },
            { "appointmentDate": "2024-08-24 12:30:00", "userId": "8", "serviceId": "2" },
            { "appointmentDate": "2024-08-25 14:45:00", "userId": "10", "serviceId": "1" },
            { "appointmentDate": "2024-08-26 16:00:00", "userId": "12", "serviceId": "5" },
            { "appointmentDate": "2024-08-27 11:15:00", "userId": "14", "serviceId": "3" },
            { "appointmentDate": "2024-08-28 13:30:00", "userId": "15", "serviceId": "2" },
            { "appointmentDate": "2024-08-29 15:45:00", "userId": "2", "serviceId": "1" },
            { "appointmentDate": "2024-08-30 17:00:00", "userId": "5", "serviceId": "4" },
            { "appointmentDate": "2024-08-31 10:15:00", "userId": "7", "serviceId": "3" },
            { "appointmentDate": "2024-09-01 12:30:00", "userId": "9", "serviceId": "2" }
        ];
        const newAppointments = yield createAppointments(appointments);
        yield Appointment_1.Appointment.save(newAppointments);
        console.log('===========================');
        console.log('Appointments seeder successfully');
        console.log('===========================');
    }
    catch (error) {
        console.log('===========================');
        console.log('ERROR Appointments SEEDER', error.message);
        console.log('===========================');
    }
    finally {
        yield db_1.AppDataSource.destroy();
    }
});
exports.appointmentSeeder = appointmentSeeder;
const createAppointments = (appointments) => __awaiter(void 0, void 0, void 0, function* () {
    const newAppointments = [];
    appointments.forEach((element, index) => {
        const appointment = new Appointment_1.Appointment();
        appointment.id = index + 1;
        appointment.appointmentDate = element.appointmentDate;
        appointment.userId = element.userId;
        appointment.serviceId = element.serviceId;
        newAppointments.push(appointment);
    });
    return newAppointments;
});
