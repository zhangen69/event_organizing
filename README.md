# Tasks Scheduling

## Backlogs
- [x] Venue autocomplete when enter the venue field in edit/add event form
- [ ] Import excel file to entry the attendee data
- [ ] Event should add STATUS
- [ ] Event Processes should group by the Event's Status
- [ ] Add Purchase Order and Delivery Order, Merge into Receipt 
- [ ] Genenrate **Payment Voucher** and **Supplier Invoice** from Event
- [ ] Payment Voucher Workflow
    - Open > Cancelled
    - Open > Prepared > Cancelled
    - Open > Prepared > Signed > Closed
- [ ] Supplier Invoice Workflow
    - Open > Cancelled
    - Open > Confirmed > Paid > Closed
    
## Scenarios
- Supplier Invoices
    1. Generate Supplier Invoices from Event
        - Admin/Staff can generate Event through the Event Resource Session
        - When they are done the setup of Event Resource, they can generate Supplier Inovices following the setup
    2. View Event's Supplier Invoices
        - When Admin/Staff view Event Info, they can also check/track the supplier invoices of the Event
        - They can directly perform some actions in the View Event Page, such as Generate Supplier Invoice, Update Supplier Invoice's Status, Edit Supplier Inovice's Info, 
    3. For Service
        - Create Supplier Invoice with Services
        - Update Supplier Invoice's Status when Confirmed and Paid
    4. For Rent Facility
        - Create Supplier Invoice with Rent Facilities
        - Update Supplier Invoice's Status When Confirmed, Paid and Received Facilities
        - Record the facilities should stored in which Store when delivered **(Delivery Order?)**
        - After event, there should return **(Return Voucher?)**
        - After returned facilities, admin/staff should update the Supplier Invoice's Status
- Payment Vouchers
    1. Freelance Performers / CREWs
        - Admin/Staff configure the provider and service items
        - Create Payment Vouncher for each Provider with Open Status
        - After prepare Cheque/Cash update Payment Voucher Status and Info
        - Admin/Staff can generate and download Payment Voucher with PDF format
        - After Provider signed the Payment Voucher (offline), Admin/Staff will update Status as Signed/Closed
- Invoices
    1. Generate Inovice from Event
        - Admin/Staff configure the Event Info
        - Admin/Staff can based on the Event generate Invoice
        - Admin/Staff can set the **Markup Rate(Profit)** based on the Total Costs (RM)
    2. Update Inovice Info
        - Admin/Staff can update Inovice Status as Confirmed, Revised, Paid, and Cancelled
- Receipts
    1. Purchase Stock Items from Shopping Malls/Super Market
        - Admin/Staff purchased stock items, they must configure the stock items for each items which they purchased
        - After configuration, they can create new Receipt
        - They can record the items store into which Store
        - After they created Receipt, system will auto generate the stock transactions for each items
- Payments
    1. Pay the Invoices
        - Admin/Staff can create Payment for certain/specific Invoice (there may have more than 1 Payment for 1 Invoice)
        - After customer says, they are paid Admin/Staff will create a new Payment
        - The Payment will created with Open
        - After Admin/Staff verified the Payment, they can update the Payment's Status
        - Untill the payment will clear the Invoice's Amount, System will auto update Invoice's Status as Paid

## General
- [x] Filter selected items while select [provider/service/facility] (autocomplete)
- [x] Add `getTotal` custom pipe

## Registration & Check-in
- [x] Allow users copy the registration link
- [ ] Allow users send the registration link to people
  - [x] Send Email
  - [ ] Preview before send email
- [ ] Scan QRCode for check-in
  - [ ] Simple Scan
  - [ ] Send a Simple Instruction after check-in
  - [ ] Send a Specific/Custom Instruction after check-in
  
## Event & Process
- [ ] Lookup the event schedule
- [ ] Set the venue, date, time for the event
  - [x] Simple Setup
  - [ ] Venue search by google maps
  - [x] Datepicker
  - [ ] Timepicker
- [ ] Manage staff in the event
  - [ ] Manage role
  - [ ] Assign role to staff
  - [ ] Manage staff handling specific process
- [x] Calculate the total price in the event
- [x] Link customer to the event

## Receipt & Invoice
- [ ] Receipt and Invoice can choose stock items in the table/list
  - [ ] Users can directly create stock item if not exists
  - [ ] There should sum the total cost
- [ ] Change [Receipt/Invoice] status as [Open/Received/Paid/Closed]
- [ ] Users can directly import the items into stock (stock-in) while it's [Received/Paid/Closed]
- [ ] Workflow of Receipt
  - [ ] Open > Checked
  - [ ] Open > Cancelled
  - [ ] Checked > Closed
- [ ] Workflow of Invoice
  - [ ] Open > Received
  - [ ] Received > Checked
  - [ ] Received > Paid
  - [ ] Checked > Paid
  - [ ] Paid > Closed

## Inventory
- [ ] Users can choose a store and make the [stock-in/stock-out]
  - [ ] The [stock-in] must use/refer to a [receipt/invoice] that is [received/paid/closed]
  - [ ] [stock-out] should specific the purpose that is for a event or else
- [ ] Stock Transaction should store each record of stock, such as [stock-in/stock-out] that users can filter/search related records if they needle

Anything else...?
