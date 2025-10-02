import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';

@Component({
  selector: 'app-register',
  standalone: true, // 👈 también es standalone
  imports: [CommonModule, FormsModule], // 👈 importa FormsModule
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.register(this.user).subscribe({
      next: () => {
        alert('✅ Cuenta creada con éxito');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        alert('❌ Error al registrar: ' + err.error.message);
      }
    });
  }
}
