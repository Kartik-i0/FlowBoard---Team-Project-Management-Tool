import { Request, Response, NextFunction } from "express";
import { ZodObject, ZodRawShape, ZodError } from "zod";
import { sendError } from "../utils/response";

export const validate  = ( schema: ZodObject<ZodRawShape>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        try{
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            })
            next();
        }catch(err){
            if(err instanceof ZodError){
               const message = err.issues.map((e) => e.message).join(", ");
               sendError(res, message, 422);
               return;
            }
            next(err);
        }
    }
}