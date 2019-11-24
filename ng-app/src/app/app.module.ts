import { StandardDisplayFieldComponent } from './standard/standard-display-field/standard-display-field.component';
import { StockItemViewComponent } from './inventory/stock-item-view/stock-item-view.component';
import { StockTransactionFormComponent } from './inventory/stock-transaction-form/stock-transaction-form.component';
import { ImportAttendeesComponent } from './event/event-plan-view/import-attendees/import-attendees.component';
import { QuotationListComponent } from './customer/quotation-list/quotation-list.component';
import { QuotationFormComponent } from './customer/quotation-form/quotation-form.component';
import { PaymentFormComponent } from './attendee/payment-form/payment-form.component';
import { CustomerViewComponent } from './customer/customer-view/customer-view.component';
import { MaterialModule } from './material.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { FileUploadModule } from 'ng2-file-upload';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationDialogComponent } from './templates/confirmation-dialog/confirmation-dialog.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { DisableControlDirective } from './directives/disable-control.directive';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { UserChangePasswordComponent } from './user/user-change-password/user-change-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { EventFormComponent } from './event/event-form/event-form.component';
import { EventListComponent } from './event/event-list/event-list.component';
import { ProviderFormComponent } from './provider/provider-form/provider-form.component';
import { ProviderListComponent } from './provider/provider-list/provider-list.component';
import { StoreListComponent } from './inventory/store-list/store-list.component';
import { StoreFormComponent } from './inventory/store-form/store-form.component';
import { StockItemListComponent } from './inventory/stock-item-list/stock-item-list.component';
import { StockItemFormComponent } from './inventory/stock-item-form/stock-item-form.component';
import { StockTransactionListComponent } from './inventory/stock-transaction-list/stock-transaction-list.component';
import { CustomerListComponent } from './customer/customer-list/customer-list.component';
import { CustomerFormComponent } from './customer/customer-form/customer-form.component';
import { InvoiceListComponent } from './customer/invoice-list/invoice-list.component';
import { InvoiceFormComponent } from './customer/invoice-form/invoice-form.component';
import { ProviderServiceListComponent } from './provider/provider-service-list/provider-service-list.component';
import { ProviderServiceFormComponent } from './provider/provider-service-form/provider-service-form.component';
import { ProviderFacilityFormComponent } from './provider/provider-facility-form/provider-facility-form.component';
import { ProviderFacilityListComponent } from './provider/provider-facility-list/provider-facility-list.component';
import { AttendanceListComponent } from './attendance/attendance-list/attendance-list.component';
import { AttendanceFormComponent } from './attendance/attendance-form/attendance-form.component';
import { AttendeeListComponent } from './attendee/attendee-list/attendee-list.component';
import { AttendeeFormComponent } from './attendee/attendee-form/attendee-form.component';
import { PaymentListComponent } from './attendee/payment-list/payment-list.component';
import { CategoryListComponent } from './provider/category-list/category-list.component';
import { CategoryFormComponent } from './provider/category-form/category-form.component';
import { AttendeeGroupListComponent } from './attendee/attendee-group-list/attendee-group-list.component';
import { AttendeeGroupFormComponent } from './attendee/attendee-group-form/attendee-group-form.component';
import { ReceiptFormComponent } from './provider/receipt-form/receipt-form.component';
import { ReceiptListComponent } from './provider/receipt-list/receipt-list.component';
import { RoleFormComponent } from './role/role-form/role-form.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { EventPlanFormComponent } from './event/event-plan-form/event-plan-form.component';
import { EventPlanListComponent } from './event/event-plan-list/event-plan-list.component';
import { PaymentVoucherListComponent } from './provider/payment-voucher-list/payment-voucher-list.component';
import { PaymentVoucherFormComponent } from './provider/payment-voucher-form/payment-voucher-form.component';
import { SupplierInvoiceFormComponent } from './provider/supplier-invoice-form/supplier-invoice-form.component';
import { SupplierInvoiceListComponent } from './provider/supplier-invoice-list/supplier-invoice-list.component';
import { RegistrationFormComponent } from './event/registration-form/registration-form.component';
import { RegistrationListComponent } from './event/registration-list/registration-list.component';
import { StandardListComponent } from './standard/standard-list/standard-list.component';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { StandardFormComponent } from './standard/standard-form/standard-form.component';
import { StandardFormFieldComponent } from './standard/standard-form-field/standard-form-field.component';
import { StandardFilterComponent } from './standard/standard-filter/standard-filter.component';
import { TitleDisplayPipe } from './pipes/title-display.pipe';
import { EventViewComponent } from './event/event-view/event-view.component';
// import { MatNativeDateModule } from '@angular/material/core';
import { RegistrationViewComponent } from './event/registration-view/registration-view.component';
import { RegisterEventComponent } from './event/register-event/register-event.component';
import { AttendeeViewComponent } from './attendee/attendee-view/attendee-view.component';
import { PageLoaderComponent } from './templates/page-loader/page-loader.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { DialogFormComponent } from './templates/dialog-form/dialog-form.component';
import { EntityDataModule } from '@ngrx/data';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { FilterOptionsPipe } from './standard/filter-options.pipe';
import { GetTotalPipe } from './pipes/get-total.pipe';
// import { SpreadSheetsModule } from './components/spread-sheets-angular/gc.spread.sheets.angular';
import { DemoXlsxComponent } from './demo-xlsx/demo-xlsx.component';
import { EventPlanViewComponent } from './event/event-plan-view/event-plan-view.component';
import { ProcessesFilterPipe } from './event/event-plan-view/processes-filter.pipe';
import { ObjectToArrayPipe } from './standard/to-array.pipe';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmationDialogComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    UserListComponent,
    UserFormComponent,
    DisableControlDirective,
    ForgotPasswordComponent,
    UserProfileComponent,
    UserChangePasswordComponent,
    ResetPasswordComponent,
    EventFormComponent,
    EventListComponent,
    ProviderFormComponent,
    ProviderListComponent,
    StoreListComponent,
    StoreFormComponent,
    StockItemListComponent,
    StockItemFormComponent,
    StockTransactionListComponent,
    CustomerListComponent,
    CustomerFormComponent,
    InvoiceListComponent,
    InvoiceFormComponent,
    ProviderServiceListComponent,
    ProviderServiceFormComponent,
    ProviderFacilityFormComponent,
    ProviderFacilityListComponent,
    AttendanceListComponent,
    AttendanceFormComponent,
    AttendeeListComponent,
    AttendeeFormComponent,
    PaymentListComponent,
    CategoryListComponent,
    CategoryFormComponent,
    AttendeeGroupListComponent,
    AttendeeGroupFormComponent,
    ReceiptFormComponent,
    ReceiptListComponent,
    RoleFormComponent,
    RoleListComponent,
    EventPlanFormComponent,
    EventPlanListComponent,
    PaymentVoucherListComponent,
    PaymentVoucherFormComponent,
    SupplierInvoiceFormComponent,
    SupplierInvoiceListComponent,
    RegistrationFormComponent,
    RegistrationListComponent,
    StandardListComponent,
    StandardFormComponent,
    StandardFormFieldComponent,
    StandardFilterComponent,
    EventViewComponent,
    RegistrationViewComponent,
    RegisterEventComponent,
    AttendeeViewComponent,
    TitleDisplayPipe,
    PageLoaderComponent,
    DialogFormComponent,
    FilterOptionsPipe,
    GetTotalPipe,
    DemoXlsxComponent,
    EventPlanViewComponent,
    ProcessesFilterPipe,
    ObjectToArrayPipe,
    CustomerViewComponent,
    PaymentFormComponent,
    QuotationFormComponent,
    QuotationListComponent,
    ImportAttendeesComponent,
    StockTransactionFormComponent,
    StockItemViewComponent,
    StandardDisplayFieldComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    FileUploadModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-bottom-right'
    }),
    MaterialModule,
    QRCodeModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    EntityDataModule,
    StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
      }
    }),
    EffectsModule.forRoot([AppEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    // SpreadSheetsModule,
    ZXingScannerModule,
    NgxQRCodeModule,
  ],
  entryComponents: [ConfirmationDialogComponent, DialogFormComponent, ImportAttendeesComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    DatePipe,
    CurrencyPipe,
    TitleDisplayPipe,
    GetTotalPipe,
    Title,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
