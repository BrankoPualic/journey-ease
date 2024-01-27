import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DestinationService } from '../../_services/destination.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { AppState } from '../../_store/app.state';
import { selectAllSeasons } from '../../_store/destinations/destinations.selectors';
import { loadSeasons } from '../../_store/destinations/destinations.actions';

@Component({
  selector: 'app-search-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent],
  templateUrl: './search-home.component.html',
  styleUrl: './search-home.component.scss',
})
export class SearchHomeComponent implements OnInit {
  searchForm: FormGroup = this.fb.group({});
  seasons$ = this.store.select(selectAllSeasons);

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.initializeForm();

    this.store.dispatch(loadSeasons());
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      searchValue: [''],
      season: [''],
    });
  }

  search() {}
}
