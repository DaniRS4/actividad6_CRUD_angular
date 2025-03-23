import { Component, inject, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/iuser.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})


export class UserFormComponent {
  @Input() _idUser: string = "";
  userForm: FormGroup = new FormGroup({}, []);
  usersService = inject(UsersService);
  user!: IUser | any;
  title: string = "Crear Usuario";
  router = inject(Router);

  async ngOnInit(){
    if(this._idUser){
      try {
      this.user = await this.usersService.getUser(this._idUser);
      this.title = "Actualizar Usuario";
      if(this.user.error == "El id debe ser correcto"){
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "El id ha sido modificado y no coincide con el usuario seleccionado previamente.",
      
        });
        this.router.navigate(['/home']);
      }
      
      } catch (msg: any) {
        console.error(msg.error);
      } 
      
    }
      

      this.userForm = new FormGroup({
        _id: new FormControl(this._idUser || null, []),
        id: new FormControl(this.user?.id || 0, []),
        first_name: new FormControl(this.user?.first_name || "", [
          Validators.required,
          Validators.minLength(3)
        ]),
        last_name: new FormControl(this.user?.last_name || "", [
          Validators.required,
          Validators.minLength(3)
        ]),
        username: new FormControl(this.user?.username || "", []),
        email: new FormControl(this.user?.email || "", [ 
          Validators.required,
          // Sé que los emails de la api no valen con este patrón, pero creo que es necesario el {2,3} del final.
          Validators.pattern(/^.+@.+\.[a-zA-Z]{2,3}$/)
        ]), 
        image: new FormControl(this.user?.image || "", [
          Validators.required,
          // que empiece por https:// o que termine en .png, .jpg, .jpeg, .gif, .bmp, .webp
          Validators.pattern(/^(https:\/\/.*|.*\.(png|jpg|jpeg|gif|bmp|webp))$/i)
        ]),
        password: new FormControl(this.user?.password || "", [
          //Validators.required,
          //Validators.minLength(8),
          //Validators.maxLength(16)
        ]),
      }, [])

    
    }

    checkControl(controlName: string, errorName: string): boolean | undefined {
      return this.userForm.get(controlName)?.hasError(errorName) && this.userForm.get(controlName)?.touched
    }

    async getDataForm() {
      let response: IUser | any;
      try {
          if (this.userForm.value._id) {
            response = await this.usersService.update(this.userForm.value);
            Swal.fire({
              title: "Usuario actualizado con éxito.",
              icon: "success",
              draggable: true
            });
            this.router.navigate(['/user',this.userForm.value._id]);

          } else {
            response = await this.usersService.insert(this.userForm.value)
            Swal.fire({
              title: "Usuario creado con éxito.",
              icon: "success",
              draggable: true
            });
            this.router.navigate(['/home']);
          }
      } catch (msg: any) {
        if (msg.status === 400) {
          Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Falló la petición, por favor inténtelo más tarde.",
                
                  });
                  this.router.navigate(['/home']);
          
        }
      }
    }
  
}
