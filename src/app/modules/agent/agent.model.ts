import mongoose from 'mongoose';
import { IAgent } from './agent.interface';

const agentSchema = new mongoose.Schema<IAgent>(
  {
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    country: { type: String, required: true },
    designation: { type: String },
    brandName: { type: String },
    workingFrom: { type: String },
    image: { type: String },
  },
  { timestamps: true },
);

const Agent = mongoose.model<IAgent>('Agent', agentSchema);
export default Agent;
