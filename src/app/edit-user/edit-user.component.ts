import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userName: string;
  userSelected: any = {};

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('userName');

    this.userService.getUserDetails(this.userName).subscribe(
      (user) => {
        this.userSelected = user;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  updateUser(userData: any): void {
    this.userService.updateUser(userData).subscribe(
      (response) => {
        console.log('User details updated successfully:', response);
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
}
