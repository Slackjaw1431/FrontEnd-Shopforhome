import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { Observable, map } from 'rxjs';
import { User } from '../user/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = 'http://localhost:9090';
  private newUser = '/registerNewUser';

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  registerUser(user: any): Observable<any> {
    return this.httpclient.post<any>(this.PATH_OF_API + this.newUser, user);
  }

  // getUsers(): Observable<User[]> {
  //   return this.httpclient.get<User[]>('http://localhost:9090/allUsers');
  // }

  getUsers(page: number, size: number): Observable<UserPageResponse> {
    const url = `http://localhost:9090/allUsersPage?page=${page}&size=${size}`;

    return this.httpclient.get<PageableResponse>(url).pipe(
      map((response: PageableResponse) => ({
        users: response.content,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        size: response.size,
        number: response.number,
      }))
    );
  }

  getUserDetails(userName: string): Observable<User> {
    const url = `http://localhost:9090/userById/${userName}`;

    return this.httpclient.get<User>(url);
  }

  deleteUser(userName: string): Observable<any> {
    const url = `http://localhost:9090/deleteUser/${userName}`;

    return this.httpclient.delete(url);
  }

  updateUser(userData: any): Observable<any> {
    const url = `http://localhost:9090/updateUser`;

    return this.httpclient.put(url, userData);
  }

  updateSelf(userData: any): Observable<any> {
    const url = `http://localhost:9090/updateSelf`;

    return this.httpclient.put(url, userData);
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      responseType: 'text',
    });
  }

  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      responseType: 'text',
    });
  }

  public roleMatch(allowedRoles): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
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
