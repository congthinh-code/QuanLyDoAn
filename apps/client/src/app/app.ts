import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api';

@Component({
  imports: [RouterOutlet, CommonModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit{
  response: any = null;
  error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {}

  testConnection() {
    this.apiService.checkHello().subscribe({
      next: (data) => {
        this.response = data;
        this.error = '';
      },
      error: (err) => {
        this.error = 'Khong the ket noi toi NestJS API Gateway! Hay kiem tra xem port 3000 da chay chua.';
        console.error(err);
      }
    });
  }
  protected readonly title = signal('client');
}
