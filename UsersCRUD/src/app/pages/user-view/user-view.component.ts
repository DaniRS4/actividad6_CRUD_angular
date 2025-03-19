import { Component, inject, Inject, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-view',
  imports: [],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {
  @Input() idUser: string = '';
  ElUser!: IUser;
  usersService = inject(UsersService);

  async ngOnInit() {
    let id = this.idUser;
    try{
      this.ElUser = await this.usersService.getUser(id);
      console.log(this.ElUser);
    }catch(error){
      console.error(error);
    }
  }

}
