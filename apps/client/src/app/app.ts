import {
  Component,
  OnInit
} from '@angular/core';

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
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // this.testConnection();
    this.checkLoginStatus();
  }

  // Kiểm tra trạng thái đăng nhập
  checkLoginStatus(): void {
    this.isLoggedIn =
      !!this.authService.getToken();
  }

  // Kiểm tra kết nối API
  testConnection(): void {
    this.apiService
      .checkHello()
      .subscribe({
        next: (data) => {
          this.response = data;
        },

        error: (err) => {
          this.error = err.message;
        }
      });
  }
}