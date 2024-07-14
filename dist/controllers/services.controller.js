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
exports.deleteService = exports.updateService = exports.createService = exports.getAllServices = void 0;
const Service_1 = require("../database/models/Service");
const getAllServices = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allServices = yield Service_1.Service.find();
        return res.status(200).json({
            success: true,
            message: "All services retrived",
            data: allServices
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting Servicess",
            error: error
        });
    }
});
exports.getAllServices = getAllServices;
const createService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const serviceName = req.body.serviceName;
        const description = req.body.description;
        if (!serviceName) {
            return res.status(400).json({
                success: false,
                message: "Service name is required"
            });
        }
        const newService = yield Service_1.Service.create({
            serviceName: serviceName,
            description: description
        }).save();
        res.json({
            success: true,
            message: "Service created",
            data: newService
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating service",
            error: error
        });
    }
});
exports.createService = createService;
const updateService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idService = req.params.id;
        const newInfo = req.body;
        const updatedService = yield Service_1.Service.update(Number(idService), newInfo);
        if (!updatedService.affected) {
            return res.status(400).json({
                success: false,
                message: "Service not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Service Updated successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating service"
        });
    }
});
exports.updateService = updateService;
const deleteService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idService = req.params.id;
        const updatedService = yield Service_1.Service.delete(Number(idService));
        if (!updatedService.affected) {
            return res.status(400).json({
                success: false,
                message: "Service not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Service deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting service"
        });
    }
});
exports.deleteService = deleteService;
