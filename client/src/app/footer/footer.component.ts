import { Component, Inject, OnInit, PLATFORM_ID, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { UserService } from '../_services/user.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit, OnDestroy {
  newsletterForm: FormGroup = this.fb.group({});
  newsletterSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (!(event instanceof NavigationEnd)) {
        return;
      }
      if (isPlatformBrowser(this.platformId)) window.scrollTo(0, 0);
    });

    this.formInit();
  }

  formInit() {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.email]],
    });
  }

  onAddSubscription() {
    this.newsletterSubscription = this.userService
      .addSubscription(this.newsletterForm.value.email)
      .subscribe({
        //TODO
        next: (response: { message: string }) => console.log(response.message),
        error: (error) => console.error(error),
      });

    this.newsletterForm.reset();
  }

  ngOnDestroy(): void {
    this.newsletterSubscription.unsubscribe();
  }
}
