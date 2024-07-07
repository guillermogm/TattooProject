import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { TokenDecoded } from "../types";

export const user= (req: Request,res: Response, next: NextFunction)=>{
    try {

    if(!req.headers.authorization){
       return res.status(401).json({
            success:false,
            message:"Unauthorized"
        })
    }
    //spit convierte en Arrays a partir de un caracter
    const token=req.headers.authorization.split(" ")[1]
    const decoded= jwt.verify(token,process.env.SECRET as string) as TokenDecoded;

    req.tokenData= {
        id: decoded.id,
        role: decoded.role
    }

    next();
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Authentication error"
        })
    }

}