import { query, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import multer from 'multer';
import path from 'path';


export const validatePlantQuery = [
    query('state')
        .optional()
        .isAlphanumeric()
        .withMessage('State must be alphanumeric'),
    query('topN')
        .isInt({ gt: 0 })
        .withMessage('TopN must be an integer greater than 0'),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];



const makeMulterUploadMiddleware = (multerUploadFunction: Function) => {
    return (req: Request, res: Response, next: NextFunction) => {
        multerUploadFunction(req, res, (err: any) => {
            if (err) {
                return res.status(500).send({
                    message: `File upload error: ${err.message}`,
                });
            }

            const file: any = req.file
            if (!file) {
                return res.status(400).send({
                    message: 'No file uploaded',
                });
            }

            const ext = path.extname(file.originalname);
            if (ext !== '.xlsx' && ext !== '.xls') {
                return res.status(400).send({
                    message: 'Wrong file type. Only .xlsx and .xls files are allowed.',
                });
            }

            next();
        });
    };
};
const upload = multer({ dest: 'uploads/' });
export const uploadExcelMiddleware = makeMulterUploadMiddleware(upload.single('file'));
