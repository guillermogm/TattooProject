"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.admin = void 0;
const admin = (req, res, next) => {
    try {
        if (req.tokenData.roleId === 3) {
            return next();
        }
        if (req.tokenData.roleId !== 2) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        next();
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error Authentication"
        });
    }
};
exports.admin = admin;
