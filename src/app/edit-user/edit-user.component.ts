import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../_services/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  userName: string;
  userSelected: User = {
    userFirstName: '',
    userLastName: '',
    userName: '',
    userPassword: '',
  };
  isUser: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.assignType();
    this.userService.getUserDetails(this.userName).subscribe(
      (user) => {
        this.userSelected.userFirstName = user.userFirstName;
        this.userSelected.userLastName = user.userLastName;
        this.userSelected.userName = user.userName;
      },
      (error) => {
        console.error('Error fetching product details:', error);
      }
    );
  }

  assignType(): void {
    if (this.userService.roleMatch(['Admin'])) {
      this.userName = this.route.snapshot.paramMap.get('userName');
    } else if (this.userService.roleMatch(['User'])) {
      this.isUser = true;
      this.userName = localStorage.getItem('userName');
    } else {
      console.log(this.userName);
    }
  }

  updateUser(userData: any): void {
    if (this.isUserDataValid(userData)) {
      // console.log(userData);
      if (this.isUser) {
        this.userService.updateSelf(userData).subscribe(
          (response) => {
            console.log('User details updated successfully:', response);
            window.alert('User details updated successfully');
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      } else {
        this.userService.updateUser(userData).subscribe(
          (response) => {
            console.log('User details updated successfully:', response);
            window.alert('User details updated successfully');
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error updating user:', error);
          }
        );
      }
    } else {
      window.alert('Please fill out all the details');
    }
  }

  isUserDataValid(data: any): boolean {
    return (
      data.userName &&
      data.userFirstName &&
      data.userLastName &&
      data.userPassword
    );
  }

  // updateUser(userData: any): void {
  //   this.userService.updateUser(userData).subscribe(
  //     (response) => {
  //       console.log('User details updated successfully:', response);
  //     },
  //     (error) => {
  //       console.error('Error updating user:', error);
  //     }
  //   );
  // }

  // updateSelf(userData: any): void {
  //   this.userService.updateSelf(userData).subscribe(
  //     (response) => {
  //       console.log('User details updated successfully:', response);
  //     },
  //     (error) => {
  //       console.error('Error updating user:', error);
  //     }
  //   );
  // }
}
