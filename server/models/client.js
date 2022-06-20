import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  providers: [{ type: mongoose.SchemaTypes.ObjectId, required: true }],
});

export default mongoose.model('Client', clientSchema);
