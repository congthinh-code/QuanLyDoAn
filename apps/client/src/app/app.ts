import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TopicListComponent } from './components/topic-list/topic-list';
import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TopicListComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  response: any = null;
  error: string = '';

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.testConnection();
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