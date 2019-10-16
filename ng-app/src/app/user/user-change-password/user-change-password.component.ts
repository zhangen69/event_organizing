import { PageLoaderService } from 'src/app/templates/page-loader/page-loader.service';
import { UserService } from './../../services/user.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-change-password',
  templateUrl: './user-change-password.component.html',
  styleUrls: ['./user-change-password.component.css']
})
export class UserChangePasswordComponent implements OnInit {
  formData = this.formBuilder.group({
    password: [null, Validators.required],
    newPassword: [null, Validators.required],
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private pageLoaderService: PageLoaderService) {
    this.pageLoaderService.toggle(true);
    this.userService.init('user');
    this.pageLoaderService.toggle(false);
  }

  ngOnInit() {
  }

  onSubmit(formData) {
    this.userService.changePassword(formData);
  }

}
