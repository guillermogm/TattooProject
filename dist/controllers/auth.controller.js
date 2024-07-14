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
exports.logInUser = exports.signInUser = void 0;
const User_1 = require("../database/models/User");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const password = req.body.password;
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }
        if (password.length < 8 || password.length > 20) {
            return res.status(400).json({
                success: false,
                message: "Password must be beetween 8 and 12"
            });
        }
        const hashedPass = bcrypt_1.default.hashSync(password, 10);
        const newUser = yield User_1.User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPass
        }).save();
        res.json({
            success: true,
            message: "User created",
            data: newUser
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating User",
            error: error
        });
    }
});
exports.signInUser = signInUser;
const logInUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are needed"
            });
        }
        const user = yield User_1.User.findOne({
            where: { email: email }
        });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email or password not valid"
            });
        }
        if (!bcrypt_1.default.compareSync(password, user.password)) {
            return res.status(400).json({
                succes: false,
                message: "Email or password not valid"
            });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            roleId: user.roleId
        }, process.env.SECRET, { expiresIn: '2h' });
        return res.status(200).json({
            success: true,
            Message: "User logged",
            token: token
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error log in user",
            error: error
        });
    }
});
exports.logInUser = logInUser;
