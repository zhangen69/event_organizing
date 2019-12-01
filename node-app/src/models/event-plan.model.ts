import mongoose from 'mongoose';
import auditable from './auditable.model';
import { MongooseHelper } from '../helpers/mongoose.helper';
import Counter from './counter.model';
import shortid from 'shortid';

const EventPlanStatus = ['Draft', 'Confirmed', 'Initial', 'Preparation', 'InProgress', 'Closed', 'Cancelled'];
const EventProcessStatus = ['Open', 'InProgress', 'Done', 'Verified', 'Closed', 'Cancelled'];
const EventProcessTypes = ['Initial', 'Preparation', 'InProgress', 'Schedule', 'Closed'];
const AttendeeStatus = ['Open', 'Paid', 'Cancelled'];

const EventServiceSchema = new mongoose.Schema({
  providerService: MongooseHelper.Types.RefObjectId('ProviderService'),
  name: MongooseHelper.Types.String(),
  quantity: MongooseHelper.Types.Number(),
  unit: MongooseHelper.Types.String(),
  unitPrice: MongooseHelper.Types.Number(),
  remarks: MongooseHelper.Types.String()
});

const EventFacilitySchema = new mongoose.Schema({
  providerFacility: MongooseHelper.Types.RefObjectId('ProviderFacility'),
  name: MongooseHelper.Types.String(),
  quantity: MongooseHelper.Types.Number(),
  unit: MongooseHelper.Types.String(),
  unitPrice: MongooseHelper.Types.Number(),
  remarks: MongooseHelper.Types.String()
});

const EventStockItemSchema = new mongoose.Schema({
  stockItem: MongooseHelper.Types.RefObjectId('StockItem'),
  name: MongooseHelper.Types.String(),
  quantity: MongooseHelper.Types.Number(),
  unit: MongooseHelper.Types.String(),
  unitPrice: MongooseHelper.Types.Number(),
  remarks: MongooseHelper.Types.String()
});

const AttendeeSchema = new mongoose.Schema({
  code: MongooseHelper.Types.String(true, shortid.generate),
  name: MongooseHelper.Types.String(),
  identityNumber: MongooseHelper.Types.String(),
  email: MongooseHelper.Types.String(),
  phoneNumber: MongooseHelper.Types.String(),
  address: MongooseHelper.Types.String(),
  organization: MongooseHelper.Types.String(),
  gender: MongooseHelper.Types.Enum(['Male', 'Female']),
  status: MongooseHelper.Types.Enum(AttendeeStatus, 'Open'),
  group: MongooseHelper.Types.String(),
  remarks: MongooseHelper.Types.String(),
  formData: MongooseHelper.Types.Object(new Object())
});

const EventProcessSchema = new mongoose.Schema({
  name: MongooseHelper.Types.String(),
  status: MongooseHelper.Types.Enum(EventProcessStatus, 'Open'),
  type: MongooseHelper.Types.Enum(EventProcessTypes, 'Initial'),
  processType: MongooseHelper.Types.String(),
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
  order: MongooseHelper.Types.Number()
});

const EventPlanNoteSchema = new mongoose.Schema({
  title: MongooseHelper.Types.String(true),
  note: MongooseHelper.Types.String(true),
  date: MongooseHelper.Types.Date()
});

const RegistrationFormSchema = new mongoose.Schema({
  title: MongooseHelper.Types.String(),
  description: MongooseHelper.Types.String(),
  fields: [Object],
  settings: Object,
  status: { type: String, enum: ['Open', 'Confirmed', 'Published'], default: 'Open' },
  remarks: MongooseHelper.Types.String(),
});

const EventPlanSchema = new mongoose.Schema({
  code: MongooseHelper.Types.String(),
  name: MongooseHelper.Types.String(true),
  venue: MongooseHelper.Types.String(),
  dateFrom: MongooseHelper.Types.Date(),
  timeFrom: MongooseHelper.Types.Date(),
  dateTo: MongooseHelper.Types.Date(),
  timeTo: MongooseHelper.Types.Date(),
  customer: MongooseHelper.Types.RefObjectId('Customer'),
  status: MongooseHelper.Types.Enum(EventPlanStatus, 'Draft'),
  services: MongooseHelper.Types.SchemaList(EventServiceSchema),
  facilities: MongooseHelper.Types.SchemaList(EventFacilitySchema),
  stockItems: MongooseHelper.Types.SchemaList(EventStockItemSchema),
  attendees: MongooseHelper.Types.SchemaList(AttendeeSchema),
  processes: MongooseHelper.Types.SchemaList(EventProcessSchema),
  // paymentVouchers: MongooseHelper.Types.RefObjectIds('PaymentVoucher'),
  // supplierInvoices: MongooseHelper.Types.RefObjectIds('SupplierInvoice'),
  // invoices: MongooseHelper.Types.RefObjectIds('Invoice'),
  // stockTransactions: MongooseHelper.Types.RefObjectIds('StockTransaction'),
  markupRate: MongooseHelper.Types.Number(),
  markupPrice: MongooseHelper.Types.Number(),
  totalCostPrice: MongooseHelper.Types.Number(),
  totalPrice: MongooseHelper.Types.Number(),
  remarks: MongooseHelper.Types.String(),
  notes: MongooseHelper.Types.SchemaList(EventPlanNoteSchema),
  registrationForm: MongooseHelper.Types.Schema(RegistrationFormSchema)
});

EventPlanSchema.add(auditable);

EventPlanSchema.pre('save', function(next) {
  console.log('pre:save');
  const receipt = this;
  const query = Counter.findOne({ domain: 'EventPlan' });
  query.then(doc => {
    const str = '000';
    const code = 'EP';
    if (!doc) {
      console.log('create new counter: EventPlan');
      const newCounter = new Counter({ domain: 'EventPlan', serial: 1 });
      const saveQuery = newCounter.save();
      saveQuery.then(newDoc => {
        const docSerial = newDoc.get('serial');
        console.log('newDoc.serial.length', docSerial.toString().length);
        const serialnumber = str.substr(0, str.length - docSerial.toString().length) + docSerial;
        receipt.set('code', `${code}-${serialnumber}`);
        next();
      });
    } else {
      console.log('update serial: EventPlan');
      doc.set('serial', doc.get('serial') + 1);
      const updateQuery = doc.save();
      updateQuery.then(updatedDoc => {
        const docSerial = updatedDoc.get('serial');
        console.log('updatedDoc.serial.length', docSerial.toString().length);
        const serialnumber = str.substr(0, str.length - docSerial.toString().length) + docSerial;
        receipt.set('code', `${code}-${serialnumber}`);
        next();
      });
    }
  });
});

export default mongoose.model('EventPlan', EventPlanSchema);
