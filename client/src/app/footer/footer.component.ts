import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../_store/app.state';
import { addSubscription } from '../_store/newsletters/newsletters.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  newsletterForm: FormGroup = this.fb.group({});

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private store: Store<AppState>,
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
    this.store.dispatch(
      addSubscription({ email: this.newsletterForm.value.email })
    );

    this.newsletterForm.reset();
  }
}
