import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  message;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.forAdmin();
    // Check if the token exists and then print it to the console
    //   const jwtToken = localStorage.getItem('jwtToken');
    //   if (jwtToken) {
    //     console.log('JWT Token:', jwtToken);
    //   } else {
    //     console.log('JWT Token not found');
    //   }
  }
  forAdmin() {
    this.userService.forAdmin().subscribe(
      (response) => {
        // console.log(response);
        this.message = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
