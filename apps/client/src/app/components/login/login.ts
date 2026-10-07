import { Component, EventEmitter, Output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div style="max-width: 350px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px;">
      <h2>Đăng Nhập</h2>
      
      <div style="margin-bottom: 15px;">
        <label>Tên đăng nhập:</label>
        <input type="text" [(ngModel)]="username" placeholder="Nhập SV01" style="width: 100%; padding: 8px; margin-top: 5px;">
      </div>

      <div style="margin-bottom: 15px;">
        <label>Mật khẩu:</label>
        <input type="password" [(ngModel)]="password" placeholder="Nhập 123456" style="width: 100%; padding: 8px; margin-top: 5px;">
      </div>

      <button (click)="onLogin()" style="width: 100%; padding: 10px; background-color: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer;">
        Đăng nhập
      </button>

      <p *ngIf="errorMessage" style="color: red; margin-top: 10px;">{{ errorMessage }}</p>
    </div>
  `
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  @Output() loggedIn = new EventEmitter<void>();
  private authService = inject(AuthService);

  onLogin(): void {
    this.authService.login({ username: this.username, password: this.password }).subscribe({
      next: (res: any) => { // 🟢 Nhận response từ NestJS
        this.errorMessage = '';
        
        // 🟢 1. Lưu Token trả về từ backend vào localStorage
        if (res && res.access_token) {
          localStorage.setItem('access_token', res.access_token);
        }

        // 🟢 2. Báo cho App component biết để đổi giao diện sang Profile
        this.loggedIn.emit();
      },
      error: () => {
        this.errorMessage = 'Sai tài khoản hoặc mật khẩu!';
      }
    });
  }
}