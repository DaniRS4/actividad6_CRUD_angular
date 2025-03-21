import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  @Input() _idUser: string = ""
  userForm: FormGroup = new FormGroup({}, []);

  ngOnInit(){
  console.log(this._idUser);
  }
}
