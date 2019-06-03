import mongoose from 'mongoose';
import auditable from './auditable.model';

const eventServiceSchema = new mongoose.Schema({
    providerService: { type: mongoose.Types.ObjectId, ref: 'ProviderService' },
    remarks: String,
});

const eventFacilitySchema = new mongoose.Schema({
    providerService: { type: mongoose.Types.ObjectId, ref: 'ProviderFacility' },
    remarks: String,
});

const eventStockItemSchema = new mongoose.Schema({
    stockItem: { type: mongoose.Types.ObjectId, ref: 'StockItem' },
    remarks: String,
});

const attendeeSchema = new mongoose.Schema({
    name: String,
    status: { type: String, enum: ['Open', 'Paid', 'Cancelled'], default: 'Open' },
    attendeeGroup: { type: mongoose.Types.ObjectId, ref: 'AttendeeGroup' },
    remarks: String,
});

const eventProcessSchema = new mongoose.Schema({
    name: String,
    status: { type: String, enum: ['Open', 'Paid', 'Cancelled'], default: 'Open' },
    startFrom: { type: Date, required: true },
    endTo: { type: Date, required: true },
    providerService: { type: mongoose.Types.ObjectId, ref: 'ProviderService' },
    providerFacility: { type: mongoose.Types.ObjectId, ref: 'ProviderFacility' },
    category: { type: mongoose.Types.ObjectId, ref: 'Category' },
    budgetAmount: Number,
    remarks: String,
});

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    customer: { type: mongoose.Types.ObjectId, ref: 'Customer' },
    eventPlan: { type: mongoose.Types.ObjectId, ref: 'EventPlan', default: null },
    totalBudgetAmount: { type: Number, default: 0.0 },
    services: { type: [eventServiceSchema], default: [] },
    facilities: { type: [eventFacilitySchema], default: [] },
    stockItems: { type: [eventStockItemSchema], default: [] },
    attendees: { type: [attendeeSchema], default: [] },
    processes: { type: [eventProcessSchema], default: [] },
    registrationForm: { type: mongoose.Types.ObjectId, ref: 'RegistrationForm', default: null },
    status: { type: String, enum: ['Open', 'Cancelled', 'Preparation', 'Initial', 'In Progress', 'Closed'], defualt: 'Open' },
});

schema.add(auditable);

export default mongoose.model('Event', schema);
