import { Component, inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";

@Component({
  selector: 'app-user-view',
  imports: [ButtonsComponent],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() _idUser: string = '';
  ElUser!: IUser | any;
  usersService = inject(UsersService);

  async ngOnInit() {
    let id = this._idUser;
    try{
      this.ElUser = await this.usersService.getUser(id);
    }catch(error){
      console.error(error);
    }
  }

}
