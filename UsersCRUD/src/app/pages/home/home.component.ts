import { Component, EventEmitter, inject, Output } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { IResponse } from '../../interfaces/iresponse.interface';
import { UserCardComponent } from "../../component/user-card/user-card.component";

@Component({
  selector: 'app-home',
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {
  arrUsers: IUser[] =[];
  usersService = inject(UsersService);
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();


  ngOnInit() {
    this.cargaUsuarios();  
  }

  async cargaUsuarios(){
    try{
      let response: IResponse = await this.usersService.getAllPromise();
      this.arrUsers = response.results;

    } catch (error) {
      console.error(error);
    } 
  }
  
  deleteUser(event: Boolean){
    if (event){
      this.cargaUsuarios();
    }
    
  }
}


