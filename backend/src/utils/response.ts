import { Response } from "express";

export const sendSuccess = (
    res: Response,
    data: unknown,
    message = "success",
    statusCode = 200,
) => {
    res.status(statusCode).json({
        success:true,
        message,
        data
    })
} 


export const sendError= (
    res:Response,
    message = "something went wrong",
    statusCode = 400
) => {
    res.status(statusCode).json({
        success:false,
        message,
    })
}