"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.superAdmin = void 0;
const superAdmin = (req, res, next) => {
    try {
        if (req.tokenData.roleId !== 3) {
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
exports.superAdmin = superAdmin;
