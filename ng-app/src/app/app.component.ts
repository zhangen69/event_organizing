import { AuthService } from './auth/auth.service';
import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';
import { PageLoaderService } from './templates/page-loader/page-loader.service';

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
        {
            name: 'Profile',
            children: [{ url: '/user/profile', name: 'My Profile' }, { url: '/user/changePassword', name: 'Change Password' }]
        },
        {
            name: 'Event',
            children: [
                { url: '/event-plan/list', name: 'Event Plans' },
                { url: '/event/list', name: 'Events' },
                // { url: '/registration-form/list', name: 'Registration Forms' },
                // { url: '/attendee/list', name: 'Attendees' },
                // { url: '/attendee-group/list', name: 'Attendee Groups' },
            ]
        },
        { url: '/customer/list', name: 'Customers' },
        {
            name: 'Invoice & Receipt',
            children: [
                { url: '/invoice/list', name: 'Invoice List' },
                { url: '/payment/list', name: 'Payments' },
                { url: '/supplier-invoice/list', name: 'Supplier Invoice List' },
                { url: '/payment-voucher/list', name: 'Payment Vouchers' },
                { url: '/receipt/list', name: 'Receipt List' }
            ]
        },
        {
            name: 'Inventory',
            children: [
                { url: '/store/list', name: 'Stores' },
                { url: '/stock-item/list', name: 'Stock Items' },
                { url: '/stock-transaction/list', name: 'Stock Transactions' }
            ]
        },
        {
            name: 'Service & Facility',
            children: [
                { url: '/provider/list', name: 'Providers' },
                { url: '/provider-service/list', name: 'Provider Services' },
                { url: '/provider-facility/list', name: 'Provider Facilities' },
                { url: '/category/list', name: 'Categories' }
            ]
        },
        { name: 'User', children: [{ url: '/user/list', name: 'User List' }] }
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
