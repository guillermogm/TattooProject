import { Request, Response } from "express"
import { Service } from "../database/models/Service"

export const createService = async (req: Request, res: Response) => {
    try {
        const serviceName = req.body.serviceName
        const description = req.body.description

        if (!serviceName) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Service name is required"
                }
            )
        }

        const newService = await Service.create({
            serviceName: serviceName,
            description: description
        }).save()


        res.json({
            success: true,
            message: "Service created",
            data: newService
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error creating service",
            error: error
        })

    }
}