import mongoose, { Schema, Document } from 'mongoose';

interface IState extends Document {
    stateAbbreviation: string;
    annualNetGeneration: number;
    fileID: string;
}

const StateSchema: Schema = new Schema({
    stateAbbreviation: { type: String, required: true },
    annualNetGeneration: { type: Number, required: true },
    fileID: { type: String, required: true }
});

export default mongoose.model<IState>('State', StateSchema);
