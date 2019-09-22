import mongoose from 'mongoose';
import auditable from './auditable.model';
import { eventFacilitySchema, eventServiceSchema, eventStockItemSchema } from './event.model';

const eventPlanCategory = new mongoose.Schema({
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    budgetAmount: Number,
});

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    categories: { type: [eventPlanCategory], default: [] },
    totalBudgetAmount: { type: Number, default: 0.0 },
    remarks: String,
    services: { type: [eventServiceSchema], default: [] },
    facilities: { type: [eventFacilitySchema], default: [] },
    stockItems: { type: [eventStockItemSchema], default: [] },
});

schema.add(auditable);

export default mongoose.model('EventPlan', schema);
