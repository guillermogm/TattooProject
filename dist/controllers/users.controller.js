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
exports.updateUserRole = exports.deleteUserById = exports.updateUserProfile = exports.getUserProfile = exports.getAllUsers = void 0;
const User_1 = require("../database/models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmail = req.query.email;
        if (userEmail) {
            const findUser = yield User_1.User.findOne({
                where: {
                    email: userEmail
                }
            });
            if (!findUser) {
                return res.status(400).json({
                    success: false,
                    message: "This email doesn't exist"
                });
            }
            return res.status(200).json({
                success: true,
                message: "User retrived",
                data: findUser
            });
        }
        //Pagination
        let limit = Number(req.query.limit) || 5;
        const page = Number(req.query.page) || 1;
        if (limit > 10) {
            limit = 10;
        }
        const allUsers = yield User_1.User.find({
            skip: (page - 1) * limit,
            take: limit
        });
        return res.status(200).json({
            success: true,
            message: "All users retrived",
            data: allUsers
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting Users",
            error: error
        });
    }
});
exports.getAllUsers = getAllUsers;
const getUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.tokenData.id;
        const user = yield User_1.User.findOne({
            where: {
                id: userId
            }
        });
        return res.status(200).json({
            success: true,
            message: "User retrived",
            data: user
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting User",
            error: error
        });
    }
});
exports.getUserProfile = getUserProfile;
const updateUserProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = req.tokenData.id;
        const { firstName, lastName, email, password } = req.body;
        let hashedPass;
        if (password) {
            if (password.length < 8 || password.length > 20) {
                return res.status(400).json({
                    success: false,
                    message: "Password must be beetween 8 and 20"
                });
            }
            hashedPass = bcrypt_1.default.hashSync(password, 10);
        }
        const updatedUser = yield User_1.User.update(Number(idUser), {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPass
        });
        console.log(updatedUser.affected);
        if (!updatedUser.affected) {
            return res.status(400).json({
                success: false,
                message: "User not found or not rows affected"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User Updated successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating user",
            error: error
        });
    }
});
exports.updateUserProfile = updateUserProfile;
const deleteUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = req.params.id;
        const deletedUser = yield User_1.User.delete(Number(idUser));
        if (!deletedUser.affected) {
            return res.status(400).json({
                success: false,
                message: "User not found or already deleted"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error deleting User",
            error: error
        });
    }
});
exports.deleteUserById = deleteUserById;
const updateUserRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const idUser = req.params.id;
        const roleId = req.body.roleId;
        if (!roleId) {
            return res.status(404).json({
                success: false,
                message: "Not role found or role is incorrect"
            });
        }
        const updatedUser = yield User_1.User.update(Number(idUser), { roleId: roleId });
        if (!updatedUser.affected) {
            return res.status(400).json({
                success: false,
                message: "Not changes made"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User Updated successfully"
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error updating user",
            error: error
        });
    }
});
exports.updateUserRole = updateUserRole;
