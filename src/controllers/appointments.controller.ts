import { Request, Response } from "express"
import { Appointment } from "../database/models/Appointment"

export const getProfileAppointments = async (req: Request, res: Response) => {
    try {
    const userId= req.tokenData.id

    const profileAppointments= await Appointment.find({
        select:{
            id:true,
            appointmentDate:true,
            user:{
                id:true,
                firstName:true,
                lastName:true,
                email:true
            },
            service:{
                id:true,
                serviceName:true,
                description:true
            }
        },
        where: {
            userId:userId
        },
        relations:{
            user:{},
            service:{}
        }
    })
    
    return res.status(200).json({
        success:true,
        message:"All profile appointments retrived",
        data:profileAppointments
    })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error getting Appointments",
            error:error
        })
    }
}