"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = require("./database/db");
const user_1 = require("./middlewares/user");
const superAdmin_1 = require("./middlewares/superAdmin");
const services_controller_1 = require("./controllers/services.controller");
const auth_controller_1 = require("./controllers/auth.controller");
const appointments_controller_1 = require("./controllers/appointments.controller");
const users_controller_1 = require("./controllers/users.controller");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4005;
app.use(express_1.default.json());
app.get("/healthy", (req, res) => {
    res.status(205).json({
        success: true,
        message: "Server is working"
    });
});
// Auth
app.post("/api/auth/register", auth_controller_1.signInUser);
app.post("/api/auth/login", auth_controller_1.logInUser);
//Services
app.get("/api/services", services_controller_1.getAllServices);
app.post("/api/services", user_1.user, superAdmin_1.superAdmin, services_controller_1.createService);
app.put("/api/services/:id", user_1.user, superAdmin_1.superAdmin, services_controller_1.updateService);
app.delete("/api/services/:id", user_1.user, superAdmin_1.superAdmin, services_controller_1.deleteService);
//Appointments
app.post("/api/appointments", user_1.user, appointments_controller_1.createAppointment);
app.get("/api/appointments", user_1.user, appointments_controller_1.getProfileAppointments);
app.get("/api/appointments/:id", user_1.user, appointments_controller_1.getAppointment);
app.put("/api/appointments/:id", user_1.user, appointments_controller_1.updateAppointment);
//Users
app.get("/api/users", user_1.user, superAdmin_1.superAdmin, users_controller_1.getAllUsers);
app.get("/api/users/profile", user_1.user, users_controller_1.getUserProfile);
app.put("/api/users/profile", user_1.user, users_controller_1.updateUserProfile);
app.delete("/api/users/:id", user_1.user, superAdmin_1.superAdmin, users_controller_1.deleteUserById);
app.put("/api/users/:id/role", user_1.user, superAdmin_1.superAdmin, users_controller_1.updateUserRole);
db_1.AppDataSource.initialize()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
    console.log('Database connected');
})
    .catch(error => {
    console.log(error);
});
