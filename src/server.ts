import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './database/db';
import { user } from './middlewares/user';
import { superAdmin } from './middlewares/superAdmin';
import { createService, deleteService, getAllServices, updateService } from './controllers/services.controller';
import { logInUser, signInUser } from './controllers/auth.controller';
import { createAppointment, deleteProfileAppointment, getAppointment, getProfileAppointments, updateAppointment } from './controllers/appointments.controller';
import { deleteUserById, getAllUsers, getUserProfile, updateUserProfile, updateUserRole } from './controllers/users.controller';
import cors from "cors";



const app =express();
app.use(cors())

const PORT = process.env.PORT || 4006


app.use(express.json())


app.get("/healthy", (req, res) => {
    res.status(205).json({
        success: true,
        message: "Server is working"
    })
})

// Auth
app.post("/api/auth/register", signInUser)
app.post("/api/auth/login", logInUser)

//Services
app.get("/api/services",getAllServices)
app.post("/api/services",user,superAdmin, createService)
app.put("/api/services/:id",user,superAdmin, updateService)
app.delete("/api/services/:id",user,superAdmin, deleteService)

//Appointments
app.post("/api/appointments",user,createAppointment)
app.get("/api/appointments",user, getProfileAppointments)
app.get("/api/appointments/:id",user,getAppointment)
app.put("/api/appointments/:id",user, updateAppointment)
app.delete("/api/appointments/:id",user, deleteProfileAppointment)
//Users
app.get("/api/users",user,superAdmin, getAllUsers)
app.get("/api/users/profile",user, getUserProfile)
app.put("/api/users/profile",user, updateUserProfile)
app.delete("/api/users/:id",user,superAdmin, deleteUserById)
app.put("/api/users/:id/role",user,superAdmin, updateUserRole)

AppDataSource.initialize()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })

        console.log('Database connected');
    })
    .catch(error => {
        console.log(error)
    })