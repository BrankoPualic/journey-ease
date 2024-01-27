import { Component, ElementRef } from '@angular/core';
import { SearchHomeComponent } from './search-home/search-home.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { SharedService } from '../_services/shared.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchHomeComponent, TestimonialsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.animateContent();
  }

  animateContent() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (
            entry.target.localName === 'p' ||
            entry.target.localName === 'h1'
          ) {
            entry.target.classList.add('show-scale-in');
          } else if (entry.target.localName === 'div') {
            entry.target.classList.add('show-opacity');
          }

          observer.unobserve(entry.target);
        }
      });
    });

    const hiddenEls: [] =
      this.elementRef.nativeElement.querySelectorAll('.hidden-el');

    hiddenEls.forEach((el: HTMLElement) => observer.observe(el));
  }
}
