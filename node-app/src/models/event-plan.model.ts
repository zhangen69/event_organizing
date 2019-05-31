import mongoose from 'mongoose';
import auditable from './auditable.model';

const eventPlanCategory = new mongoose.Schema({
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    budgetAmount: Number,
});

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    categories: { type: [eventPlanCategory], default: [] },
    totalBudgetAmount: Number,
    remarks: String,
});

schema.add(auditable);

export default mongoose.model('EventPlan', schema);
