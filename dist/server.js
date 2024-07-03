"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4005;
app.use(express_1.default.json());
app.get('/healthy', (req, res) => {
    res.status(205).json({
        success: true,
        message: "Server is working"
    });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
