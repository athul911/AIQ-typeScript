import { SortOrder } from 'mongoose';
import Plant from '../models/plants';
import State from '../models/states';
import { loadExcelData } from '../utils/excelUtils';
import { promises as fs } from 'fs';
import { v4 as uuidv4 } from 'uuid'
import {InvalidExcelDataError} from  '../customExceptions'


export const getPlantsData = async (topN: number, fileID: string,state?: string ) => {
    let query:{ [key: string]: string } = { fileID: fileID }; 
    
    if (state) {
        query.plantState = state; 
    }
    let sortCriteria: {[key: string]: SortOrder} = { annualNetGeneration: -1 }; // sort by annualnet in desc.
    let plantsQuery = Plant.find(query,{ _id: 0, __v: 0 }).sort(sortCriteria); //dont need id,v attrs from mdb
    plantsQuery = plantsQuery.limit(topN);

    let plants = await plantsQuery.exec();

    return plants;
};


export const savePlantsData = async (filePath: string,unlink:Boolean = true) => {
    const data = await loadExcelData(filePath);
    const plants = data['plantJson'];
    const stateData = data['stateJson'];
    const fileID:String = uuidv4()
    if (plants.length < 1 || stateData.length < 1) {
        throw new InvalidExcelDataError('Invalid Excel data format. Missing required fields.');
    }

    const totalGenerationByState: {[key: string]: number} = {};

    const stateDocuments = stateData.map((state: any) => {
        const stateAbbreviation = state['State abbreviation'];
        const annualNetGeneration = state['State annual net generation (MWh)'];
        totalGenerationByState[stateAbbreviation] = annualNetGeneration;
        return {
            stateAbbreviation: stateAbbreviation,
            annualNetGeneration: annualNetGeneration,
            fileID: fileID
        };
    });

    await State.insertMany(stateDocuments); // not really being used atm but can be used if we wanna extend the functinality


    const plantDocuments: any[] = [];
    plants.forEach((plant: any) => {
        const generation: number| null = parseFloat(plant['Plant annual net generation (MWh)']) || null;
        let percentageInState: number | null = generation !== null ? 0 : null;

            const state = plant['Plant state abbreviation'];
            const totalGeneration = totalGenerationByState[state];
            if (totalGeneration && totalGeneration > 0 && generation !== null ) {
                percentageInState = parseFloat(((generation as number / totalGeneration) * 100).toFixed(2));
            }
            plantDocuments.push({
                fileID: fileID,
                plantName: plant['Plant name'],
                plantState: state,
                annualNetGeneration: generation,
                percentageInState: percentageInState
            });
    });

    
    await Plant.insertMany(plantDocuments);
    if (unlink)
    await fs.unlink(filePath);
    return fileID
};
