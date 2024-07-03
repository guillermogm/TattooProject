import 'dotenv/config';
import express from 'express';




const app =express();
const PORT = process.env.PORT || 4005

app.use(express.json())

app.get('/healthy', (req, res) => {
    res.status(205).json({
        success: true,
        message: "Server is working"
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})