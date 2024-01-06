import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  @Output() showSignUpEvent: EventEmitter<string> = new EventEmitter<string>();

  onShowSignUp() {
    this.showSignUpEvent.emit('sign-up');
  }
}
