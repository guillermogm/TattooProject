import { Request, Response } from "express"

export const createService = async (req: Request, res: Response) => {
    try {
        // saca info del body del json
        const name = req.body.name
        const nationality = req.body.nationality
        // Comprobar campos vacios
        if (!name) {
            return res.status(400).json(
                {
                    success: false,
                    message: "name is required"
                }
            )
        }
        if (!nationality) {
            return res.status(400).json(
                {
                    success: false,
                    message: "nationality is required"
                }
            )
        }
        // Guardar datos en la base de datos
        const newAuthor = await ({
            name: name,
            nationality: nationality
        })

        // Respuesta correcta de guardado
        res.json({
            success: true,
            message: "Author created",
            data: newAuthor
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error creating author",
            error: error
        })

    }
}