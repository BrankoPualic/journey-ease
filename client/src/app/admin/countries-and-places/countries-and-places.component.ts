import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { KeyHandler } from '../../_shared/key-handler';
import { AppState } from '../../_store/app.state';
import {
  addCountry,
  loadCountries,
} from '../../_store/countries/countries.actions';
import { selectAllCountries } from '../../_store/countries/countries.selectors';
import { Country } from '../../_types/shared.types';

@Component({
  selector: 'app-countries-and-places',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './countries-and-places.component.html',
  styleUrl: './countries-and-places.component.scss',
})
export class CountriesAndPlacesComponent
  extends KeyHandler<Country>
  implements OnInit, OnDestroy
{
  private countriesSubscription: Subscription | undefined;
  countries$ = this.store.select(selectAllCountries);
  countryKeys: string[] = [];
  insertForm: FormGroup = this.fb.group({});

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private elementRef: ElementRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.countriesSubscription = this.countries$.subscribe((countries) => {
      if (countries && countries.length > 0) {
        this.countryKeys = this.getObjectKeys(countries[0]);
      }
    });

    this.initializeForm();

    this.store.dispatch(loadCountries());
  }

  initializeForm() {
    this.insertForm = this.fb.group({
      countryName: ['', [Validators.required]],
    });
  }

  onInsertCountry() {
    this.store.dispatch(
      addCountry({ countryName: this.insertForm.value.countryName })
    );

    this.insertForm.reset();
  }

  onRowAction(countryId: number) {
    // Turn off active element
    const operationMenuVisible = this.elementRef.nativeElement.querySelector(
      '.operations-menu:not(.hidden)'
    );

    if (operationMenuVisible) {
      operationMenuVisible.classList.toggle('hidden');
    }

    // Turn on clicked element
    const selectedOperationMenu = this.elementRef.nativeElement.querySelector(
      `.operations-menu-country-${countryId}`
    );

    // If clicked element is the same then allow to hide
    if (operationMenuVisible === selectedOperationMenu) return;

    selectedOperationMenu.classList.toggle('hidden');
  }

  // #TODO
  onEditCountryRow() {}

  onDeleteCountryRow(countryId: number) {}

  private unsubscribeCountries() {
    if (this.countriesSubscription) {
      this.countriesSubscription.unsubscribe();
      this.countriesSubscription = undefined;
    }
  }

  ngOnDestroy(): void {
    this.unsubscribeCountries();
  }
}
