import { Component, OnInit } from '@angular/core';
import { TextInputComponent } from '../../_forms/text-input/text-input.component';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DestinationService } from '../../_services/destination.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent],
  templateUrl: './search-home.component.html',
  styleUrl: './search-home.component.scss',
})
export class SearchHomeComponent implements OnInit {
  searchForm: FormGroup = this.fb.group({});
  // seasons$ = this.destinationService.getSeasons();

  constructor(
    private fb: FormBuilder,
    private destinationService: DestinationService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.searchForm = this.fb.group({
      searchValue: [''],
      season: [''],
    });
  }

  search() {}
}
