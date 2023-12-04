import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Check if the token exists and then print it to the console
    //   const jwtToken = localStorage.getItem('jwtToken');
    //   if (jwtToken) {
    //     console.log('JWT Token:', jwtToken);
    //   } else {
    //     console.log('JWT Token not found');
    //   }
  }
}
