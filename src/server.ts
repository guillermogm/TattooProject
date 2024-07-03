import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './database/db';




const app =express();
const PORT = process.env.PORT || 4005

app.use(express.json())

app.get('/healthy', (req, res) => {
    res.status(205).json({
        success: true,
        message: "Server is working"
    })
})

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