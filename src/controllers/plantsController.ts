import { Request, Response } from 'express';
import { getPlantsData, savePlantsData } from '../services/plantsService';
import { errorMiddleware } from '../middlewares/ErrorMiddleware';


export const getPlants = async (req: Request, res: Response): Promise<void> => {
    const { state, topN, fileID } = req.query;
    try {
        const plants = await getPlantsData(parseInt(topN as string, 10), fileID as string, state as string);
        if (plants.length) {
            res.json({ "total_length": plants.length, "plants": plants });
        } else {
            res.status(404).json({ error: 'No plants found for the given input' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred while fetching plants data' });
    }
};

export const uploadPlants = async (req: Request, res: Response): Promise<void> => {
    const file:any = req.file;
    if (!file) {
        res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        const fileID = await savePlantsData(file.path);
        res.status(200).json({fileID: fileID , message: 'Plant and state data uploaded successfully' });
    }
    catch (error) {
        errorMiddleware(error as any, req, res, () => {});
        console.log(error);
    }
};


//export const uploadMiddleware = upload.single('file');