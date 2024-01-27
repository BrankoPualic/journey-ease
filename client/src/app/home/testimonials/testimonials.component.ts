import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.animateContent();
  }

  animateContent() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.localName === 'div') {
            entry.target.classList.add('show-testimonial');
          } else if (entry.target.localName === 'h2') {
            entry.target.classList.add('show-scale-in');
          }
          observer.unobserve(entry.target);
        }
      });
    });

    const hiddenEls =
      this.elementRef.nativeElement.querySelectorAll('.hidden-el');

    hiddenEls.forEach((el: HTMLElement) => observer.observe(el));
  }
}
