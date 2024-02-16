import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.state';
import { loadFaqs } from '../_store/faqs/faqs.actions';
import { selectAllFaqs } from '../_store/faqs/faqs.selectors';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss',
})
export class FaqsComponent implements OnInit {
  faqs$ = this.store.select(selectAllFaqs);
  openedQuestionIndex: number | undefined;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(loadFaqs());

    setTimeout(() => {
      this.animateContent();
    }, 200);
  }

  onOpenQuestion(questionIndex: number) {
    const question =
      this.elementRef.nativeElement.querySelectorAll('.question-row');
    const answer =
      this.elementRef.nativeElement.querySelectorAll('.answer-block');

    question.forEach((el: HTMLElement, i: number) => {
      this.renderer.removeClass(el, 'question-active');

      this.changeQAStyle(answer[i], 'max-height', 0);
    });

    if (questionIndex === this.openedQuestionIndex) {
      this.openedQuestionIndex = undefined;
      return;
    }

    this.changeQAStyle(
      answer[questionIndex],
      'max-height',
      answer[questionIndex].scrollHeight + 'px'
    );

    this.renderer.addClass(question[questionIndex], 'question-active');

    this.openedQuestionIndex = questionIndex;
  }

  changeQAStyle(el: HTMLElement, style: string, value: string | number) {
    this.renderer.setStyle(el, style, value);
  }

  animateContent() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('show-scale-in');
          observer.unobserve(entry.target);
        }
      });
    });

    const hiddenEls =
      this.elementRef.nativeElement.querySelectorAll('.hidden-el');

    console.log(hiddenEls);

    hiddenEls.forEach((el: HTMLElement) => observer.observe(el));
  }
}
