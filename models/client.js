import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    phone: { type: String, required: true },
    providers: [
      { _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Provider' } },
    ],
  },
  { timestamps: true },
);

export default mongoose.model('Client', clientSchema);
