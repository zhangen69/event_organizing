import mongoose from 'mongoose';
import auditable from './auditable.model';
import { Timestamp } from 'bson';

const eventServiceSchema = new mongoose.Schema({
    providerService: { type: mongoose.Types.ObjectId, ref: 'ProviderService' },
    quantity: Number,
    remarks: String,
});

const eventFacilitySchema = new mongoose.Schema({
    providerFacility: { type: mongoose.Types.ObjectId, ref: 'ProviderFacility' },
    quantity: Number,
    remarks: String,
});

const eventStockItemSchema = new mongoose.Schema({
    stockItem: { type: mongoose.Types.ObjectId, ref: 'StockItem' },
    quantity: Number,
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
    type: { type: String, enum: ['Initial', 'Preparation', 'Schedule', 'Closure', 'Other'], default: 'Initial' },
    startFromDate: { type: Date, required: true },
    startFromTime: { type: Date, required: true },
    endToDate: { type: Date, required: true },
    endToTime: { type: Date, required: true },
    provider: { type: mongoose.Types.ObjectId, ref: 'Provider' },
    services: { type: [eventServiceSchema], default: [] },
    facilities: { type: [eventFacilitySchema], default: [] },
    personInCharged: { type: Object, default: null },
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
    status: { type: String, enum: ['Open', 'Cancelled', 'Preparation', 'Initial', 'InProgress', 'Closed'], defualt: 'Open' },
});

schema.add(auditable);

export default mongoose.model('Event', schema);
