import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    domain: { type: String, required: true },
    serial: { type: Number, default: 0 },
});

export default mongoose.model('SerialCounter', schema);
