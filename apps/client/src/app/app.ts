import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './components/topic-list/topic-list';
import { LoginComponent } from './components/login/login';
import { ProfileComponent } from './components/profile/profile';
import { ApiService } from './services/api';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    CommonModule, 
    TopicListComponent, 
    LoginComponent,
    ProfileComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  response: any = null;
  error: string = '';
  isLoggedIn = false;

  constructor(
    private apiService: ApiService,
    private authService: AuthService // Inject AuthService để quản lý Token
  ) {}

  ngOnInit() {
    this.testConnection();
    this.checkLoginStatus();
  }

  // Cập nhật trạng thái đăng nhập dựa vào LocalStorage
  checkLoginStatus() {
    this.isLoggedIn = !!this.authService.getToken();
  }

  testConnection() {
    this.apiService.checkHello().subscribe({
      next: (data) => {
        this.response = data;
      },
      error: (err) => {
        this.error = err.message;
      }
    });
  }
}