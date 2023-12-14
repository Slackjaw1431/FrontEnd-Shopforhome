import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user: User = {
    userFirstName: '',
    userLastName: '',
    userName: '',
    userPassword: '',
  };
  constructor(private userService: UserService, private router: Router) {}

  registerUser(form: any): void {
    if (form.valid) {
      console.log(this.user);
      this.userService.registerUser(this.user).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          window.alert('User registered');
          this.router.navigate(['/login']);
          // Additional handling after successful registration
        },
        (error) => {
          console.error('Error registering user:', error);
          window.alert('Error registering User');
          // Handle error
        }
      );
    } else {
      window.alert('Please fill out all the details');
    }
  }
}
