"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user = (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        //spit convierte en Arrays a partir de un caracter
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET);
        req.tokenData = {
            id: decoded.id,
            roleId: decoded.roleId
        };
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Authentication error"
        });
    }
};
exports.user = user;
