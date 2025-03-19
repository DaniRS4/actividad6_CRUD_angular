import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IResponse } from '../interfaces/iresponse.interface';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient)
  private baseUrl: string = "https://peticiones.online/api/users"

  getAllObservable(): Observable<IResponse> {
    return this.httpClient.get<IResponse>(this.baseUrl)
  }

  getAllPromise(): Promise<IResponse> {
    return lastValueFrom(this.httpClient.get<IResponse>(this.baseUrl))
  }
}
