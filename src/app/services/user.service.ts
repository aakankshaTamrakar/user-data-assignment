import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserdata } from '../model/userdata';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public http: HttpClient) { }

  public getUserDataFromJson():Observable<IUserdata[]>{
    return this.http.get<IUserdata[]>('http://localhost:3000/users');
  }
}
