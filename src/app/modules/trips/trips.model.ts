import mongoose from 'mongoose';
import { ITrips } from './trips.interface';

const tripsSchema = new mongoose.Schema<ITrips>(
  {
    country: { type: String, required: true },
    location: { type: String, required: true },
    startData: { type: Date, required: true },
    endData: { type: Date, required: true },
    image: { type: String },
  },
  { timestamps: true },
);

const Trips = mongoose.model<ITrips>('Trips', tripsSchema);

export default Trips;
