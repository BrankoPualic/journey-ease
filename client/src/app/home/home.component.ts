import { Component } from '@angular/core';
import { SearchHomeComponent } from './search-home/search-home.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchHomeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
