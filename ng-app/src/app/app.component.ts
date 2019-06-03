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
  mobileQuery: MediaQueryList;
  routes = [
    { url: '/product/list', name: 'Products', children: [
        { url: '/product/form', name: 'New' },
        { url: '/product/list', name: 'List' },
    ]},
    { url: '/event-plan/list', name: 'Event Plans' },
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
