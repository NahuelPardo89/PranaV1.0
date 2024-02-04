import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/Services/dialog/dialog.service';
import { UserService } from 'src/app/Services/users/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private dialog:DialogService, private router: Router) {
    this.userForm = this.fb.group({
      dni: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required,Validators.pattern("^[0-9]*$")]],
      is_staff: [false]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const nameInUpperCase = this.userForm.get('name')?.value.toUpperCase();
      const lastNameInUpperCase = this.userForm.get('last_name')?.value.toUpperCase();
  
      // Actualizar el valor del campo name en el formulario con la versión en mayúsculas
      this.userForm.get('name')?.setValue(nameInUpperCase);
      this.userForm.get('last_name')?.setValue(lastNameInUpperCase);
      
      this.userService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          this.dialog.showSuccessDialog("Usuario creado correctamente");
          this.router.navigate(['/Dashboard/accounts/users']);
        },
        error: (error: HttpErrorResponse) => {
          // Aquí manejas el error basado en el mensaje específico
          if (error.error.message.includes("DNI")) {
            this.dialog.showErrorDialog("Ya existe un usuario con ese DNI.");
          } else if (error.error.message.includes("email")) {
            this.dialog.showErrorDialog("Ya existe un usuario con ese email.");
          } else {
            // Para otros tipos de errores no esperados
            this.dialog.showErrorDialog("Error al crear el usuario.");
          }
        }
      });
    }
  }
  onCancel(){
    this.router.navigate(['/Dashboard/accounts/users']);
  }

}
