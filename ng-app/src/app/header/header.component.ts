import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuth = false;
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
  private authListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.isAuth = isAuth;
    });
  }

  onLogout() {
    this.authService.logout();
  }

}
