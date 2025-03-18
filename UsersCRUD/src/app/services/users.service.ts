import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private httpClient = inject(HttpClient)
  private baseUrl: string = "https://peticiones.online/api/users"

}
