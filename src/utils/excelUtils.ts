import { promises as fs } from 'fs';
import * as xlsx from 'xlsx';



export const loadExcelData = async (filePath:string) => {
    const fileBuffer = await fs.readFile(filePath);
    const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
    const sheetNamePlant = 'PLNT21';
    const sheetNameState = 'ST21';
    
    const plantSheet = workbook.Sheets[sheetNamePlant];
    const jsonDataPlant = xlsx.utils.sheet_to_json(plantSheet);
    
    
    const stateSheet = workbook.Sheets[sheetNameState];
    const jsonDataState = xlsx.utils.sheet_to_json(stateSheet);
    
    jsonDataPlant.shift()
    jsonDataState.shift()
    
    return {"plantJson":jsonDataPlant,"stateJson":jsonDataState}
}


  