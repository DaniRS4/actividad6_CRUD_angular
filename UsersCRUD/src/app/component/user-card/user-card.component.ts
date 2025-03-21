import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { ButtonsComponent } from "../../shared/buttons/buttons.component";

@Component({
  selector: 'app-user-card',
  imports: [ButtonsComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() myUser!: IUser;
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();

  deleteUser(event: Boolean){
    this.deleteItemEmit.emit(event);
  }

}
