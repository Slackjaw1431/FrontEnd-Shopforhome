import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { User } from '../user/user';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-allusers',
  templateUrl: './allusers.component.html',
  styleUrls: ['./allusers.component.css'],
})
export class AllusersComponent implements OnInit {
  users: User[] = [];
  unfilteredUsers: User[] = [];
  totalElements: number;
  totalPages: number;
  currentPage: number = 0;
  pageSize: number = 5;
  pageableResponse: PageableResponse | undefined;
  hiddenUserId = 'admin';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(): void {
    this.userService
      .getUsers(this.currentPage, this.pageSize)
      .subscribe((response: UserPageResponse) => {
        this.unfilteredUsers = response.users;

        this.users = this.unfilteredUsers.filter(
          (user) => user.userName.toLowerCase() !== 'admin'
        );

        this.pageSize = response.size;
        this.totalElements = response.totalElements;
        this.currentPage = response.number;
        this.totalPages = response.totalPages;
      });
  }

  deleteUser(userName: string): void {
    this.userService.deleteUser(userName).subscribe(
      (response) => {
        console.log('User deleted successfully:', response);
        window.alert('User deleted successfully');
        this.router.navigate(['/allUsers']);
      },
      (error) => {
        console.error('Error deleting user:', error);
        window.alert('Error deleting user');
      }
    );
  }

  onPageChange(currentPage: number): void {
    this.currentPage = currentPage;
    this.getUserList();
  }
}
interface UserPageResponse {
  users: User[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface PageableResponse {
  content: User[];
  pageable: {
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: { sorted: boolean; unsorted: boolean; empty: boolean };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
