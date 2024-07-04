import mongoose, { Schema, Document } from 'mongoose';

interface IPlant extends Document {
    plantName: string;
    plantState: string;
    annualNetGeneration: number|null;
    percentageInState: number|null;
    fileID: string;
}

const PlantSchema: Schema = new Schema({
    plantName: { type: String, required: true },
    plantState: { type: String, required: true },
    annualNetGeneration: { type: Number, required: false }, // some empty field plants are there in the sheet
    percentageInState: { type: Number, required: false },
    fileID : { type: String, required: true }
});

PlantSchema.index({ fileID: 1 });


export default mongoose.model<IPlant>('Plant', PlantSchema);
