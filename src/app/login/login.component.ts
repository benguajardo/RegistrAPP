import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  // Arreglo de usuarios de ejemplo
  users = [
    { email: 'usuario1@example.com', password: 'password1' },
    { email: 'usuario2@example.com', password: 'password2' },
  ];

  onSubmit() {
    // Buscar un usuario con las credenciales ingresadas
    const user = this.users.find(
      (u) => u.email === this.email && u.password === this.password
    );

    if (user) {
      // Usuario encontrado, hacer algo, como redirigir a otra página
      // Puedes usar Angular Router para la navegación.
      console.log('Inicio de sesión exitoso');
    } else {
      // Usuario no encontrado, mostrar un mensaje de error
      console.log('Credenciales incorrectas');
    }
  }
}