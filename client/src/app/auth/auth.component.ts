import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

type LayoutType = 'sign-in' | 'sign-up';
type UrlSegment = string | null | LayoutType | undefined;
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [SignInComponent, SignUpComponent],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent implements OnInit {
  formType?: UrlSegment;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.takeUrlParam();
    this.selectLayout(this.formType);
  }

  selectLayout(type: UrlSegment) {
    const authTextBg =
      this.elementRef.nativeElement.querySelector('.auth-text');

    if (type === 'sign-up') {
      const signInText =
        this.elementRef.nativeElement.querySelector('.sign-in-text');
      const signUpForm =
        this.elementRef.nativeElement.querySelector('.sign-up-form');

      this.activeFormsState(authTextBg, signInText, signUpForm, type);
    } else if (type === 'sign-in') {
      const signUpText =
        this.elementRef.nativeElement.querySelector('.sign-up-text');
      const signInForm =
        this.elementRef.nativeElement.querySelector('.sign-in-form');

      this.activeFormsState(authTextBg, signUpText, signInForm, type);
    }
  }

  activeFormsState(
    authTextBg: HTMLElement,
    authText: HTMLElement,
    authForm: HTMLElement,
    formType: 'sign-up' | 'sign-in'
  ) {
    if (formType === 'sign-in') {
      this.renderer.setStyle(authTextBg, 'left', '50%');
      this.renderer.setStyle(authTextBg, 'border-radius', '0 10px 10px 0');
      this.renderer.setStyle(authText, 'right', '15%');
      this.renderer.setStyle(authForm, 'opacity', 1);
      this.renderer.setStyle(authForm, 'right', '115%');
    } else if (formType === 'sign-up') {
      this.renderer.setStyle(authTextBg, 'left', 0);
      this.renderer.setStyle(authTextBg, 'border-radius', '10px 0 0 10px');
      this.renderer.setStyle(authText, 'left', '15%');
      this.renderer.setStyle(authForm, 'opacity', 1);
      this.renderer.setStyle(authForm, 'right', '15%');
    }
  }

  nonActiveFormsState(
    authText: HTMLElement,
    authForm: HTMLElement,
    formType: 'sign-up' | 'sign-in'
  ) {
    if (formType === 'sign-up') {
      this.renderer.setStyle(authText, 'right', '-180%');
      this.renderer.setStyle(authForm, 'opacity', 0);
      this.renderer.setStyle(authForm, 'right', '65%');
    } else if (formType === 'sign-in') {
      this.renderer.setStyle(authText, 'left', '-125%');
      this.renderer.setStyle(authForm, 'opacity', 0);
      this.renderer.setStyle(authForm, 'right', '65%');
    }
  }

  toggleForms(type: UrlSegment) {
    const signUpText =
      this.elementRef.nativeElement.querySelector('.sign-up-text');
    const signInForm =
      this.elementRef.nativeElement.querySelector('.sign-in-form');
    const authTextBg =
      this.elementRef.nativeElement.querySelector('.auth-text');
    const signInText =
      this.elementRef.nativeElement.querySelector('.sign-in-text');
    const signUpForm =
      this.elementRef.nativeElement.querySelector('.sign-up-form');

    if (type === 'sign-up') {
      this.router.navigateByUrl('/auth/sign-up');
      this.nonActiveFormsState(signUpText, signInForm, type);
      this.activeFormsState(authTextBg, signInText, signUpForm, type);
    } else if (type === 'sign-in') {
      this.router.navigateByUrl('/auth/sign-in');
      this.nonActiveFormsState(signInText, signUpForm, type);
      this.activeFormsState(authTextBg, signUpText, signInForm, type);
    }
  }

  private takeUrlParam() {
    this.route.paramMap.subscribe((params) => {
      this.formType = params.get('type');
      this.toggleForms(this.formType);
    });
  }
}
