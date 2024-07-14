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
exports.getAppointment = exports.getProfileAppointments = exports.updateAppointment = exports.createAppointment = void 0;
const Appointment_1 = require("../database/models/Appointment");
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointment = req.body.appointmentDate;
        const userId = req.tokenData.id;
        const serviceId = req.body.serviceId;
        if (!appointment || !userId || !serviceId) {
            res.status(400).json({
                success: false,
                message: "Appointment date, user id and service Id are required"
            });
        }
        const newAppointment = yield Appointment_1.Appointment.create({
            appointmentDate: appointment,
            userId: userId,
            serviceId: serviceId
        }).save();
        return res.status(201).json({
            success: true,
            message: "Appointment created"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error creating Appointment",
            error: error
        });
    }
});
exports.createAppointment = createAppointment;
const updateAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointmentId = req.params.id;
        const newInfo = req.body;
        const userId = req.tokenData.id;
        const roleId = req.tokenData.roleId;
        //Search if the appoinment is of the user
        const findAppointment = yield Appointment_1.Appointment.findOne({
            where: {
                id: Number(appointmentId),
                userId: userId
            }
        });
        //If it's not from the user and is not admin Error
        if (!findAppointment && roleId === 1) {
            return res.status(400).json({
                success: false,
                message: "You aren't authoritated to make this change"
            });
        }
        const newAppointment = yield Appointment_1.Appointment.update({ id: parseInt(appointmentId) }, newInfo);
        if (!newAppointment.affected) {
            return res.status(400).json({
                success: true,
                message: "Not changes to appointments"
            });
        }
        return res.status(201).json({
            success: true,
            message: "Appointment Updated"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating Appointment",
            error: error
        });
    }
});
exports.updateAppointment = updateAppointment;
const getProfileAppointments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.id;
        const profileAppointments = yield Appointment_1.Appointment.find({
            select: {
                id: true,
                appointmentDate: true,
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                },
                service: {
                    id: true,
                    serviceName: true,
                    description: true
                }
            },
            where: {
                userId: userId,
            },
            relations: {
                user: {},
                service: {}
            }
        });
        return res.status(200).json({
            success: true,
            message: "All profile appointments retrived",
            data: profileAppointments
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting Appointments",
            error: error
        });
    }
});
exports.getProfileAppointments = getProfileAppointments;
const getAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.id;
        const appointmentId = Number(req.params.id);
        const roleId = req.tokenData.roleId;
        //Admin and SuperAdmin can view any appointment
        if (roleId === 2 || roleId === 3) {
            const profileAppointmentAdmin = yield Appointment_1.Appointment.find({
                select: {
                    id: true,
                    appointmentDate: true,
                    user: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    },
                    service: {
                        id: true,
                        serviceName: true,
                        description: true
                    }
                },
                where: {
                    id: appointmentId
                },
                relations: {
                    user: {},
                    service: {}
                }
            });
            return res.status(200).json({
                success: true,
                message: "Appointment retrived",
                data: profileAppointmentAdmin
            });
        }
        const profileAppointment = yield Appointment_1.Appointment.findOne({
            select: {
                id: true,
                appointmentDate: true,
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                },
                service: {
                    id: true,
                    serviceName: true,
                    description: true
                }
            },
            where: {
                userId: userId,
                id: appointmentId
            },
            relations: {
                user: {},
                service: {}
            }
        });
        if (!profileAppointment) {
            return res.status(400).json({
                success: false,
                message: "Profile can't retrive this appointment",
            });
        }
        return res.status(200).json({
            success: true,
            message: "Profile appointment retrived",
            data: profileAppointment
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting Appointment",
            error: error
        });
    }
});
exports.getAppointment = getAppointment;
