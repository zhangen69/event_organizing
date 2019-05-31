import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    audit: {
        createdBy: { type: mongoose.Types.ObjectId, ref: 'User', default: null },
        createdDate: { type: Date, default: Date.now },
        updatedBy: { type: mongoose.Types.ObjectId, ref: 'User', default: null },
        updatedDate: { type: Date, default: Date.now },
    },
});

export default schema;
