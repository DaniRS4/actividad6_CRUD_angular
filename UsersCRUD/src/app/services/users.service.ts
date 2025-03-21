import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom} from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';
import { IUser } from '../interfaces/iuser.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient)
  private baseUrl: string = "https://peticiones.online/api/users"

  getAllPromise(): Promise<IResponse> {
    return lastValueFrom(this.httpClient.get<IResponse>(this.baseUrl))
  }

  getUser(_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.get<IUser>(`${this.baseUrl}/${_id}`))
  }

  delete(_id: string): Promise<IUser> {
    return lastValueFrom(this.httpClient.delete<IUser>(`${this.baseUrl}/${_id}`))
  }
 
}
