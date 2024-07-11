import { Request, Response } from "express"
import { User } from "../database/models/User"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

export const signInUser = async (req: Request, res: Response) => {
    try {
        const firstName =req.body.firstName
        const lastName =req.body.lastName
        const email = req.body.email
        const password = req.body.password

        if (!email) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Email is required"
                }
            )
        }
        if (!password) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Password is required"
                }
            )
        }
        if (password.length < 8 || password.length > 20) {
            return res.status(400).json(
                {
                    success: false,
                    message: "Password must be beetween 8 and 12"
                }
            )
        }

        const hashedPass = bcrypt.hashSync(password, 10)

        const newUser = await User.create({
            firstName:firstName,
            lastName:lastName,
            email: email,
            password: hashedPass
        }).save()

        res.json({
            success: true,
            message: "User created",
            data: newUser
        })
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Error creating User",
            error: error
        })

    }
}
export const logInUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and Password are needed"
            })
        }

        const user = await User.findOne({
            where: { email: email }
        })
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Email or password not valid"
            })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({
                succes: false,
                message: "Email or password not valid"
            })
        }


       const token = jwt.sign({
            id: user.id,
            roleId: user.roleId
          }, process.env.SECRET as string, { expiresIn: '2h' });
          

        return res.status(200).json({
            success: true,
            Message: "User logged",
            token: token
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error log in user",
            error: error
        })

    }
}