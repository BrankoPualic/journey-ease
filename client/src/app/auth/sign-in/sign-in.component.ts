import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AppState } from '../../_store/app.state';
import { Store } from '@ngrx/store';
import { signin } from '../../_store/auth/auth.actions';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  @Output() showSignUpEvent: EventEmitter<string> = new EventEmitter<string>();
  signinForm: FormGroup = this.fb.group({});

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
        ],
      ],
    });
  }

  signin() {
    if (!this.signinForm.valid) return;

    const userSignin = this.signinForm.value;

    this.store.dispatch(signin({ userSignin }));

    this.signinForm.reset();
  }

  onShowSignUp() {
    this.showSignUpEvent.emit('sign-up');
  }
}
