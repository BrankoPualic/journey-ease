import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ValidatorFn,
  AbstractControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import { CommonModule } from '@angular/common';
import { DestinationService } from '../../_services/destination.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  @Output() showSignInEvent: EventEmitter<string> = new EventEmitter<string>();
  signupForm: FormGroup = this.fb.group({});
  // countries$ = this.destinationService.getCountries();

  constructor(
    private fb: FormBuilder,
    private destinationService: DestinationService
  ) {}
  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.signupForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: [null, Validators.pattern(/^\+?[0-9\s.-]+$/)],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/),
        ],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
      country: [0, [Validators.pattern(/^[1-9]\d*$/)]],
      newsletter: [false],
    });

    this.signupForm.controls['password'].valueChanges.subscribe({
      next: () => {
        this.signupForm.controls['confirmPassword'].updateValueAndValidity();
      },
    });
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control.value === control.parent?.get(matchTo)?.value
        ? null
        : { notMatching: true };
    };
  }

  signup() {}

  onShowSignIn() {
    this.showSignInEvent.emit('sign-in');
  }
}
