import { Request, Response } from "express"
import { User } from "../database/models/User"

export const getAllUsers = async (req: Request, res: Response) => {
    try {
        const userEmail=req.query.email as string

        if(userEmail){
            const findUser= await User.findOne({
                where:{
                    email: userEmail
                }
            })
            if(!findUser){
                return res.status(400).json({
                    success: false,
                    message: "This email doesn't exist"
                })
            }
            return res.status(200).json({
                success: true,
                message: "User retrived",
                data: findUser
            })
        }
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

export const updateUserProfile = async (req: Request, res: Response)=>{
    try {
        const idUser= req.tokenData.id
        const newInfo=req.body
        
        const updatedUser = await User.update(Number(idUser), newInfo)
    
        if(!updatedUser.affected){
            return res.status(400).json({
                success:false,
                message:"User not found or not rows affected"
            })
        }

        return res.status(200).json({
            success:true,
            message:"User Updated successfully"
        })

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Error updating user",
            error:error
        })
        
    }
}

export const deleteUserById = async (req: Request, res: Response)=>{
    try {
        const idUser= req.params.id
        
        const deletedUser = await User.delete(Number(idUser))
    
        if(!deletedUser.affected){
            return res.status(400).json({
                success:false,
                message:"User not found or already deleted"
            })
        }

        return res.status(200).json({
            success:true,
            message:"User deleted successfully"
        })

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Error deleting User",
            error:error
        })
        
    }
}

export const updateUserRole = async (req: Request, res: Response)=>{
    try {
        const idUser= req.params.id
        const newInfo=req.body

        if(!newInfo.roleId || newInfo.roleId < 0 || newInfo.roleId > 3){
            return res.status(400).json({
                success:false,
                message:"Not role found or role is incorrect"
            })
        }
        const updatedUser = await User.update(Number(idUser), newInfo)

        if(!updatedUser.affected){
            return res.status(400).json({
                success:false,
                message:"Not changes made"
            })
        }

        return res.status(200).json({
            success:true,
            message:"User Updated successfully"
        })

    } catch (error) {

        return res.status(500).json({
            success:false,
            message:"Error updating user",
            error:error
        })
        
    }
}