import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';
import Swal from 'sweetalert2';
import { UsersService } from '../../services/users.service';

@Component({
  selector: '[app-buttons]',
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() myUser!: IUser | any;
  usersServices = inject(UsersService);
  @Output() deleteItemEmit: EventEmitter<Boolean> = new EventEmitter();
  router = inject(Router);
  @Input() volver: Boolean = false;

  deleteUser(_id: string){
    console.log('Se ha pulsado el botón de borrar para el usuario:', this.myUser._id);
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Quieres eliminar a este usuario?",
      text: "Será eliminado permanentemente",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "¡Sí, eliminar!",
      cancelButtonText: "¡No, cancelar!",
      reverseButtons: true
    }).then(async (result) => {
      if (result.isConfirmed) {
        swalWithBootstrapButtons.fire({
          title: "Usuario eliminado",
          icon: "success"
        });
        await this.usersServices.delete(_id);
        if(this.deleteItemEmit.observed){
          this.deleteItemEmit.emit(true); 
        }else{
          this.router.navigate(['/home']);
        }
        
        console.log(`Se ha eliminado: ${JSON.stringify(this.myUser)}`);
      } else if (
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire({
          title: "Cancelado",
          icon: "error"
        });
      }
    });
  }

}
