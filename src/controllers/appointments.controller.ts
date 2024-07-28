import { Request, Response } from "express"
import { Appointment } from "../database/models/Appointment"

export const createAppointment = async (req: Request, res: Response) => {
    try {
        const appointment = req.body.appointmentDate
        const userId = req.tokenData.id
        const serviceId = req.body.serviceId

        if (!appointment || !userId || !serviceId) {
            res.status(400).json({
                success: false,
                message: "Appointment date, user id and service Id are required"
            })
        }

        const newAppointment = await Appointment.create({
            appointmentDate: appointment,
            userId: userId,
            serviceId: serviceId
        }).save()

        return res.status(201).json({
            success: true,
            message: "Appointment created"
        })


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error creating Appointment",
            error: error
        })


    }
}

export const updateAppointment = async (req: Request, res: Response) => {
    try {
        const appointmentId =req.params.id
        const newInfo = req.body
        const userId=req.tokenData.id
        const roleId=req.tokenData.roleId

        //Search if the appoinment is of the user
        const findAppointment= await Appointment.findOne({
            where: {
                id:Number(appointmentId),
                userId:userId
            }
        })
        //If it's not from the user and is not admin Error
        if(!findAppointment && roleId === 1){
            return res.status(400).json({
                success: false,
                message: "You aren't authoritated to make this change"
            })
        }

        const newAppointment = await Appointment.update({id:parseInt(appointmentId)}, newInfo)

        if(!newAppointment.affected){
            return res.status(400).json({
                success: true,
                message: "Not changes to appointments"
            })
        }

        return res.status(201).json({
            success: true,
            message: "Appointment Updated"
        })


    } catch (error) {

        return res.status(500).json({
            success: false,
            message: "Error updating Appointment",
            error: error
        })


    }
}

export const getProfileAppointments = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.id

        const profileAppointments = await Appointment.find({
            select: {
                id: true,
                appointmentDate: true,
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                },
                service: {
                    id: true,
                    serviceName: true,
                    description: true
                }
            },
            where: {
                userId: userId,
            },
            relations: {
                user: {},
                service: {}
            }
        })

        return res.status(200).json({
            success: true,
            message: "All profile appointments retrived",
            data: profileAppointments
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting Appointments",
            error: error
        })
    }
}

export const getAppointment = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.id
        const appointmentId = Number(req.params.id)
        const roleId = req.tokenData.roleId

        //Admin and SuperAdmin can view any appointment
        if (roleId === 2 || roleId === 3) {
            const profileAppointmentAdmin = await Appointment.find({
                select: {
                    id: true,
                    appointmentDate: true,
                    user: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true
                    },
                    service: {
                        id: true,
                        serviceName: true,
                        description: true
                    }
                },
                where: {
                    id: appointmentId
                },
                relations: {
                    user: {},
                    service: {}
                }
            })
            return res.status(200).json({
                success: true,
                message: "Appointment retrived",
                data: profileAppointmentAdmin
            })
        }

        const profileAppointment = await Appointment.findOne({
            select: {
                id: true,
                appointmentDate: true,
                user: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true
                },
                service: {
                    id: true,
                    serviceName: true,
                    description: true
                }
            },
            where: {
                userId: userId,
                id: appointmentId
            },
            relations: {
                user: {},
                service: {}
            }
        })

        if (!profileAppointment) {
            return res.status(400).json({
                success: false,
                message: "Profile can't retrive this appointment",
            })
        }

        return res.status(200).json({
            success: true,
            message: "Profile appointment retrived",
            data: profileAppointment
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting Appointment",
            error: error
        })
    }
}

export const deleteProfileAppointment = async (req: Request, res: Response) => {
    try {
        const userId = req.tokenData.id
        const appointmentId=+req.params.id

        await Appointment.delete({id:appointmentId, userId:userId})

        return res.status(200).json({
            success: true,
            message: "Appointment delete successfully",
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting Appointments",
            error: error
        })
    }
}

