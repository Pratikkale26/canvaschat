import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";


export function middleware(req:Request, res:Response, next:NextFunction) {
    const token = req.headers["authorization"] ?? ""

    const decoded = Jwt.verify(token, JWT_SECRET) as {userId: string}

    if(decoded) {
        req.userId = decoded.userId
        next()
    }else{
        res.status(403).json({
            message: "Unauthorized"
        })
    }

}