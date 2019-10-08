import mongoose from 'mongoose';
import auditable from './auditable.model';
import { MongooseHelper } from '../helpers/mongoose.helper';

const EventServiceSchema = new mongoose.Schema({
    providerService: MongooseHelper.Types.RefObjectId('ProviderService'),
    name: MongooseHelper.Types.String(),
    quantity: MongooseHelper.Types.Number(),
    unit: MongooseHelper.Types.String(),
    unitPrice: MongooseHelper.Types.Number(),
    remarks: MongooseHelper.Types.String(),
});

const EventFacilitySchema = new mongoose.Schema({
    providerFacility: MongooseHelper.Types.RefObjectId('ProviderFacility'),
    name: MongooseHelper.Types.String(),
    quantity: MongooseHelper.Types.Number(),
    unit: MongooseHelper.Types.String(),
    unitPrice: MongooseHelper.Types.Number(),
    remarks: MongooseHelper.Types.String(),
});

const EventStockItemSchema = new mongoose.Schema({
    stockItem: MongooseHelper.Types.RefObjectId('StockItem'),
    name: MongooseHelper.Types.String(),
    quantity: MongooseHelper.Types.Number(),
    unit: MongooseHelper.Types.String(),
    unitPrice: MongooseHelper.Types.Number(),
    remarks: MongooseHelper.Types.String(),
});

const AttendeeStatus = ['Open', 'Paid', 'Cancelled'];

const AttendeeSchema = new mongoose.Schema({
    name: MongooseHelper.Types.String(),
    status: MongooseHelper.Types.Enum(AttendeeStatus, 'Open'),
    attendeeGroup: MongooseHelper.Types.String(),
    remarks: MongooseHelper.Types.String(),
});

const EventProcessStatus = ['Initial', 'Preparation', 'Schedule', 'Closure', 'Other'];
const EventProcessTypes = ['Initial', 'Preparation', 'Schedule', 'Closure', 'Other'];

const EventProcessSchema = new mongoose.Schema({
    name: MongooseHelper.Types.String(),
    status: MongooseHelper.Types.Enum(EventProcessStatus, 'Open'),
    processType: MongooseHelper.Types.Enum(EventProcessTypes, 'Initial'),
    type: MongooseHelper.Types.String(),
    startFromDate: MongooseHelper.Types.Date(null, true),
    startFromTime: MongooseHelper.Types.Date(null, true),
    endToDate: MongooseHelper.Types.Date(null, true),
    endToTime: MongooseHelper.Types.Date(null, true),
    provider: MongooseHelper.Types.RefObjectId('Provider'),
    services: MongooseHelper.Types.SchemaList(EventServiceSchema),
    facilities: MongooseHelper.Types.SchemaList(EventFacilitySchema),
    providerService: MongooseHelper.Types.RefObjectId('ProviderService'),
    providerFacility: MongooseHelper.Types.RefObjectId('ProviderFacility'),
    personInCharged: MongooseHelper.Types.Object(),
    budgetAmount: MongooseHelper.Types.Number(),
    remarks: MongooseHelper.Types.String(),
    order: MongooseHelper.Types.Number(),
});

const EventPlanNoteSchema = new mongoose.Schema({
    title: MongooseHelper.Types.String(true),
    note: MongooseHelper.Types.String(true),
    date: MongooseHelper.Types.Date(),
});

const EventPlanStatus = ['Draft', 'Confirmed', 'InProgress', 'Closed', 'Cancelled'];

const EventPlanSchema = new mongoose.Schema({
    name: MongooseHelper.Types.String(true),
    venue: MongooseHelper.Types.String(),
    customer: MongooseHelper.Types.RefObjectId('Customer'),
    status: MongooseHelper.Types.Enum(EventPlanStatus, 'Draft'),
    services: MongooseHelper.Types.SchemaList(EventServiceSchema),
    facilities: MongooseHelper.Types.SchemaList(EventFacilitySchema),
    stockItems: MongooseHelper.Types.SchemaList(EventStockItemSchema),
    attendees: MongooseHelper.Types.SchemaList(AttendeeSchema),
    processes: MongooseHelper.Types.SchemaList(EventProcessSchema),
    markupRate: MongooseHelper.Types.Number(),
    markupPrice: MongooseHelper.Types.Number(),
    totalCostPrice: MongooseHelper.Types.Number(),
    totalPrice: MongooseHelper.Types.Number(),
    remarks: MongooseHelper.Types.String(),
    notes: MongooseHelper.Types.SchemaList(EventPlanNoteSchema),
});

EventPlanSchema.add(auditable);

export default mongoose.model('EventPlan', EventPlanSchema);
