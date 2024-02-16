import { Component, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-photographer-opportunity',
  standalone: true,
  imports: [],
  templateUrl: './photographer-opportunity.component.html',
  styleUrl: './photographer-opportunity.component.scss',
})
export class PhotographerOpportunityComponent implements OnInit {
  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.animateContent();
  }

  animateContent() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target.localName === 'h2') {
            entry.target.classList.add('show-scale-in');
          } else if (
            entry.target.classList.contains('hidden-scale-in') &&
            entry.target.localName === 'div'
          ) {
            entry.target.classList.add('show-scale-in');
          } else if (entry.target.localName === 'div') {
            entry.target.classList.add('show-el');
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
