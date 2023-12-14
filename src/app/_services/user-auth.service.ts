import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  constructor() {}

  public setRoles(roles: []) {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): [] {
    return JSON.parse(localStorage.getItem('roles'));
  }

  public setToken(jwtToken: string) {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string {
    return localStorage.getItem('jwtToken');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  // public isAdmin(): void {
  //   const rolesString = localStorage.getItem('roles');

  //   // Parse the roles string to JSON format
  //   let roles: { roleName: string; roleDescription: string } | null = null;

  //   if (rolesString) {
  //     try {
  //       roles = JSON.parse(rolesString);
  //     } catch (error) {
  //       console.error('Error parsing roles from LocalStorage:', error);
  //     }
  //   }

  // Check if roleName is 'Admin'
  //   if (roles && roles.roleName === 'Admin') {
  //     console.log('User has Admin role');
  //   } else {
  //     console.log('User does not have Admin role');
  //   }
  // }

  // public isUser(): boolean {
  //   const roles = JSON.parse(localStorage.getItem('roles'));
  //   if (roles.roleName == 'User') {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
}
