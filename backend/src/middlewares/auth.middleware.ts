import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { sendError } from "../utils/response";
import { AuthRequest } from "../types";

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    try{
        const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
        if(!token){
            return sendError(res, "Unauthorized - No token provided", 401);
        }
    
        const decoded = verifyToken(token);
        req.userId = decoded.userId;
        next();
    }catch(err){
        sendError(res, "Unauthorized - Invalid token", 401);
    }
}