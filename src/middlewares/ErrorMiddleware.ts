import { NextFunction } from "express";
import { InvalidExcelDataError } from "../customExceptions";
import {Response} from "express";

export const errorMiddleware = (error: Error, req: any , res: any, next: NextFunction) => {
    if (error instanceof InvalidExcelDataError) {
        res.status(400).json({ error: error.message });
    } else {
        console.error('Unhandled error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};