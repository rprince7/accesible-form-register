import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  submitted: boolean = false;

  title = 'Form Validation';

  schema = {
    name: 'El campo nombre es obligatorio',
    email: { required: 'El campo email es obligatorio', valid: 'El campo email no es válido' },
    password: { required: 'El campo password es obligatorio', min: 'El campo password requiere minimo 8 caracteres' },
  };

  registerForm = this.fb.group({
    name: ['', { validators: [Validators.required] }],
    email: ['', { validators: [Validators.required, Validators.email] }],
    password: ['', { validators: [Validators.required, Validators.minLength(8)] }]
  });
  errors: any = null;
  typeFiledPassword: any = 'password';
  showPasswordImage = "../assets/img/show-password.webp";
  srPasswordText = "Password oculto";

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      this.errors = {
        name: this.registerForm.get('name')?.errors,
        email: this.registerForm.get('email')?.errors,
        password: this.registerForm.get('password')?.errors
      };
    } else {
      this.errors = null;
      alert('El formulario de regisro ha sido enviado correctamente');
    }
  }

  onShowPass() {
    if(this.typeFiledPassword === 'password'){
      this.typeFiledPassword = 'text';
      this.showPasswordImage = "../assets/img/show-password.webp"; 
      this.srPasswordText = "Password mostrado";
    } else {
      this.typeFiledPassword = 'password';
      this.showPasswordImage = "../assets/img/hide-password.webp"; 
      this.srPasswordText = "Password oculto";
    }
  }

  

}
