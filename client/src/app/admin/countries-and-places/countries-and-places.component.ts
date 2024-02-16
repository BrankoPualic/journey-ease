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
import { SharedService } from '../../_services/shared.service';
import { AppState } from '../../_store/app.state';
import {
  addCountry,
  editCountry,
  loadCountries,
  removeCountry,
} from '../../_store/countries/countries.actions';
import { selectAllCountries } from '../../_store/countries/countries.selectors';

@Component({
  selector: 'app-countries-and-places',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './countries-and-places.component.html',
  styleUrl: './countries-and-places.component.scss',
})
export class CountriesAndPlacesComponent implements OnInit, OnDestroy {
  private countriesSubscription?: Subscription;
  countriesCount = 0;
  countries$ = this.store.select(selectAllCountries);
  countryKeys: string[] = [];
  insertForm: FormGroup = this.fb.group({});
  editingCountryIndex?: number;
  selectedAdminTab = 'countries';

  constructor(
    private store: Store<AppState>,
    private fb: FormBuilder,
    private elementRef: ElementRef,
    private sharedService: SharedService
  ) {}

  ngOnInit(): void {
    this.countriesSubscription = this.countries$.subscribe((countries) => {
      if (countries && countries.length > 0) {
        this.countriesCount = countries.length;

        this.countryKeys = this.sharedService.getObjKeys(countries[0]);

        this.unsubscribeCountries();
      }
    });

    this.initializeForm();

    this.store.dispatch(loadCountries());
  }

  onToggleCountriesPlaces(tab: string) {
    this.selectedAdminTab = tab;

    const countriesTab = this.elementRef.nativeElement.querySelector(
      '.admin-tab-countries'
    );
    const placesTab =
      this.elementRef.nativeElement.querySelector('.admin-tab-places');

    switch (tab) {
      case 'countries':
        this.sharedService.removeActiveClassAdmin(placesTab);
        this.sharedService.addActiveClassAdmin(countriesTab);
        break;
      case 'places':
        this.sharedService.removeActiveClassAdmin(countriesTab);
        this.sharedService.addActiveClassAdmin(placesTab);
        break;
      default:
        this.sharedService.removeActiveClassAdmin(placesTab);
        this.sharedService.addActiveClassAdmin(countriesTab);
    }
  }

  initializeForm() {
    this.insertForm = this.fb.group({
      countryName: ['', [Validators.required]],
      editCountry: ['', [Validators.required]],
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
  onEditCountryRow(countryId: number) {
    this.editingCountryIndex = countryId;
  }

  onEditCancel() {
    this.editingCountryIndex = undefined;
  }

  onEditCountry(countryId: number) {
    if (this.insertForm.value.editCountry === '') {
      this.editingCountryIndex = undefined;

      return;
    }

    this.store.dispatch(
      editCountry({
        content: { countryId, countryName: this.insertForm.value.editCountry },
      })
    );

    this.editingCountryIndex = undefined;
  }

  onDeleteCountryRow(countryId: number) {
    this.store.dispatch(removeCountry({ countryId }));
  }

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
