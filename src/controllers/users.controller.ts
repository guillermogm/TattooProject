import { Request, Response } from "express"
import { User } from "../database/models/User"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        //Pagination
        let limit = Number(req.query.limit) || 5
        const page = Number(req.query.page) || 1

        if (limit > 10) {
            limit = 10
        }

        const allUsers = await User.find({
            skip: (page - 1) * limit,
            take: limit
        })

        return res.status(200).json({
            success: true,
            message: "All users retrived",
            data: allUsers
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting Users",
            error: error
        })
    }
}

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId= req.tokenData.id

        const user = await User.findOne({
            where:{
                id:userId
            }
        })

        return res.status(200).json({
            success: true,
            message: "User retrived",
            data: user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error getting User",
            error: error
        })
    }
}