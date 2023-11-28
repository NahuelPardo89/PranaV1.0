import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/Services/dialog/dialog.service';
import { UserService } from 'src/app/Services/users/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private dialog:DialogService) {
    this.userForm = this.fb.group({
      dni: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
      name: ['', Validators.required],
      last_name: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      is_active: [true],
      is_staff: [false]
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(
        response => {
          this.dialog.openConfirmDialog("Usuario creado correctamente")
        },
        error => {
          // Manejo de errores
        }
      );
    }
  }

}
