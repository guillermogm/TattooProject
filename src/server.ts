import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './database/db';
import { user } from './middlewares/user';
import { superAdmin } from './middlewares/superAdmin';
import { createService } from './controllers/services.controller';
import { logInUser, signInUser } from './controllers/auth.controller';




const app =express();
const PORT = process.env.PORT || 4005

app.use(express.json())

app.get('/healthy', (req, res) => {
    res.status(205).json({
        success: true,
        message: "Server is working"
    })
})
// Auth
app.post('/api/auth/register', signInUser)
app.post('/api/auth/login', logInUser)
//Services
app.post("/api/appointments", createService)

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