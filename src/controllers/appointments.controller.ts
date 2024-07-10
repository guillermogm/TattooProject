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
            userId:userId,
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

export const getAppointment = async (req: Request, res: Response) => {
    try {
    const userId= req.tokenData.id
    const appointmentId=Number(req.params.id)
    const roleId=req.tokenData.roleId
    
    //Admin and SuperAdmin can view any appointment
    if(roleId === 2 || roleId===3){
        const profileAppointmentAdmin= await Appointment.find({
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
                id:appointmentId
            },
            relations:{
                user:{},
                service:{}
            }
        })
        return res.status(200).json({
            success:true,
            message:"Appointment retrived",
            data:profileAppointmentAdmin
        })
    }

    const profileAppointment= await Appointment.findOne({
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
            userId:userId,
            id:appointmentId
        },
        relations:{
            user:{},
            service:{}
        }
    })

    if(!profileAppointment){    
    return res.status(400).json({
        success:false,
        message:"Profile can't retrive this appointment",
    }) 
    }
    
    return res.status(200).json({
        success:true,
        message:"Profile appointment retrived",
        data:profileAppointment
    })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Error getting Appointment",
            error:error
        })
    }
}

