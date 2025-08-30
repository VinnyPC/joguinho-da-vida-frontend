import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root', // disponibiliza globalmente
})
export class UserService {
  private _userData: any = null;

  setUserData(data: any) {
    this._userData = data;
  }

  getUserData() {
    return this._userData;
  }

  get email(): string | null {
    return this._userData?.email ?? null;
  }

  get name(): string | null {
    return this._userData?.given_name ?? null;
  }
}
