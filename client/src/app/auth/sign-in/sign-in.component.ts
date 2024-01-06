import { Component, Output, EventEmitter } from '@angular/core';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [TextInputComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  @Output() showSignUpEvent: EventEmitter<string> = new EventEmitter<string>();

  onShowSignUp() {
    this.showSignUpEvent.emit('sign-up');
  }
}
