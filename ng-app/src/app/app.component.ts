import { AuthService } from './services/auth.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'ng-app';
  isAuth = false;
  sidenavOpened = true;
  mobileQuery: MediaQueryList;
  routes = [
    { url: '/event-plan/list', name: 'Event Plans' },
    { url: '/event/list', name: 'Events' },
    { url: '/store/list', name: 'Stores' },
    { url: '/stock-item/list', name: 'Stock Items' },
    { url: '/stock-transaction/list', name: 'Stock Transactions' },
    { url: '/invoice/list', name: 'Invoices' },
    { url: '/supplier-invoice/list', name: 'Supplier Invoices' },
    { url: '/receipt/list', name: 'Receipts' },
    { url: '/provider/list', name: 'Providers' },
    { url: '/provider-service/list', name: 'Provider Services' },
    { url: '/provider-facility/list', name: 'Provider Facilities' },
    { url: '/attendee/list', name: 'Attendees' },
    { url: '/attendee-group/list', name: 'Attendee Groups' },
    { url: '/payment-voucher/list', name: 'Payment Vouchers' },
    { url: '/payment/list', name: 'Payments' },
    { url: '/registration-form/list', name: 'Registration Forms' },
    { url: '/customer/list', name: 'Customers' },
    { url: '/category/list', name: 'Categories' },
    { url: '/user/list', name: 'Users' },
    { url: '/user/changePassword', name: 'Change Password' },
    { url: '/user/profile', name: 'My Profile' },
  ];

  private _mobileQueryListener: () => void;
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }

  ngOnInit() {
    this.authService.autoAuthUser();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  onLogout() {
    this.authService.logout();
  }

}
