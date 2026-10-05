import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopicListComponent } from './components/topic-list/topic-list'; 

@Component({
  imports: [RouterOutlet, TopicListComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('client');
}
