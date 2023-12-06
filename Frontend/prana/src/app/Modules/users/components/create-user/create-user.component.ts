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
      //is_active: [true],
      is_staff: [false]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          this.dialog.showSuccessDialog("Usuario creado correctamente");
          this.router.navigate(['/Dashboard/accounts/users']);
          
        },
        error: (error) => {
          this.dialog.showErrorDialog(error);
        }
        // Opcionalmente, puedes incluir 'complete' si necesitas manejar la finalización
      });
    }
  }
  onCancel(){
    this.router.navigate(['/Dashboard/accounts/users']);
  }

}
