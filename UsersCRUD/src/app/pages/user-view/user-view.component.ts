import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-view',
  imports: [ButtonsComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() _idUser: string = '';
  ElUser: IUser | any;
  usersService = inject(UsersService);
  router = inject(Router);

  async ngOnInit() {
    let id = this._idUser;
    try{
      this.ElUser = await this.usersService.getUser(id);
      if(this.ElUser.error == "El id debe ser correcto"){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El usuario no existe",
      
        });
        this.router.navigate(['/home']);
      }
    }catch(msg:any){
      console.error(msg.error);
    }
  }

}
