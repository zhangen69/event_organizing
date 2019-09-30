# Tasks Scheduling

## Backlogs
[ ] Venue autocomplete when enter the venue field in edit/add event form
[ ] Import excel file to entry the attendee data

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
