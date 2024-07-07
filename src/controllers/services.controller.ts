import { Request, Response } from "express"
import { Service } from "../database/models/Service"

export const createService = async (req: Request, res: Response) => {
    try {
        // saca info del body del json
        const serviceName = req.body.serviceName
        const description = req.body.description
        // Comprobar campos vacios
        if (!serviceName) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Service name is required"
                }
            )
        }
        // Guardar datos en la base de datos
        const newService = await Service.create({
            serviceName: serviceName,
            description: description
        }).save()

        // Respuesta correcta de guardado
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