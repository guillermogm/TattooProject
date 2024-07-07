import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './database/db';
import { user } from './middlewares/user';
import { superAdmin } from './middlewares/superAdmin';
import { createService } from './controllers/services.controller';




const app =express();
const PORT = process.env.PORT || 4005

app.use(express.json())

app.get('/healthy', (req, res) => {
    res.status(205).json({
        success: true,
        message: "Server is working"
    })
})

app.post("/api/appointments",user,superAdmin, createService)

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