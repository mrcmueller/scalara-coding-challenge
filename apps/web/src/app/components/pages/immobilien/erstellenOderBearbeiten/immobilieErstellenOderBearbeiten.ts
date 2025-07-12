import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PostleitzahlEditorComponent } from '../../../form/postleitzahl/postleitzahl-editor.component';
import { HausnummerEditorComponent } from '../../../form/hausnummer/hausnummer-editor.component';
import { StadtEditorComponent } from '../../../form/stadt/stadt-editor.component';
import { StrasseEditorComponent } from '../../../form/strasse/strasse-editor.component';
import { ImmobilienService } from '../../../../api/services';
import {
  ImmobilieAendernDto,
  ImmobilieAntwortDto,
  ImmobilieErstellenDto,
} from '../../../../api/models';
import { postalCodeValidator } from '../../../form/postleitzahl/postalCodeValidator.directive';
import { LandEditorComponent } from '../../../form/land/land-editor.component';
import { LAENDER, Land, LOCALES } from '../../../form/land/laender';
import { ActivatedRoute, Router } from '@angular/router';
import { ImmobilienRefresh } from '../../../../services/immobilienRefresh.service';
import { MatDialog } from '@angular/material/dialog';
import { ExampleErrorDialog } from '../../../error/exampleError';
import { NameEditorComponent } from '../../../form/name/name-editor.component';
import { BeschreibungEditorComponent } from '../../../form/beschreibung/beschreibung-editor.component';
import { take } from 'rxjs';

@Component({
  selector: 'immobilie-erstellen-oder-bearbeiten',
  standalone: true,
  templateUrl: './immobilieErstellenOderBearbeiten.html',
  styleUrl: './immobilieErstellenOderBearbeiten.scss',
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NameEditorComponent,
    StrasseEditorComponent,
    HausnummerEditorComponent,
    PostleitzahlEditorComponent,
    StadtEditorComponent,
    LandEditorComponent,
    BeschreibungEditorComponent,
  ],
})
export class ImmobilieErstellenOderBearbeiten {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(ImmobilienService);
  private refresh$ = inject(ImmobilienRefresh);
  readonly dialog = inject(MatDialog);
  laender = [...LAENDER, 'Großbritannien'];
  locales = [...LOCALES, 'GB'];
  initialLandId = 0;
  land = this.laender[this.initialLandId];
  locale = this.locales[this.initialLandId];

  id = this.getId();

  getLocale = () => {
    return this.locale;
  };

  getId(): string | undefined {
    return this.route.snapshot.params['immobilienId'];
  }

  immobilieErstellenForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/.*[A-Za-z].*/),
    ]) as FormControl<string>,
    strasse: new FormControl('', [
      Validators.pattern(/.*[A-Za-z].*/),
      Validators.required,
    ]) as FormControl<string>,
    hausnummer: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d/),
    ]) as FormControl<string>,
    postleitzahl: new FormControl('', [
      Validators.required,
      postalCodeValidator(this.getLocale),
    ]) as FormControl<string>,
    stadt: new FormControl('', [
      Validators.pattern(/.*[A-Za-z].*/),
      Validators.required,
    ]) as FormControl<string>,
    land: new FormControl(this.land, Validators.required) as FormControl<Land>,
    beschreibung: new FormControl('', [
      Validators.required,
      Validators.minLength(15),
    ]) as FormControl<string>,
  });

  fetchData() {
    if (this.id) {
      this.service
        .immobilienControllerImmobilie({ id: this.id })
        .pipe(take(1))
        .subscribe({
          next: (res) => this.handleFetchedData(res),
          error: (error) => this.handleError(error),
        });
    }
  }

  handleFetchedData(res: ImmobilieAntwortDto) {
    // fill forms with fetched data
    const controls = this.immobilieErstellenForm.controls;

    for (const key in controls) {
      if (key in res) {
        const formControl = (controls as any)[key];
        const newValue = (res as any)[key];
        formControl.setValue(newValue);
      }
    }
  }

  handleError(err: Error) {
    // error not handled fully because of time
    this.openErrorDialog(err);
  }

  ngOnInit() {
    // Only executes if id is existing in URL which means we want to edit an Immobilie
    this.fetchData();

    this.revalidatePostalCodeOnCountryChange();
  }

  revalidatePostalCodeOnCountryChange() {
    // Validiere Postleitzahl erneut wenn sich Land ändert
    this.immobilieErstellenForm.controls.land.valueChanges.subscribe((val) => {
      this.setLocale(val);
      this.immobilieErstellenForm.controls.postleitzahl.updateValueAndValidity();
    });
  }

  setLocale(newValue: any): string {
    this.locale = this.locales[this.laender.findIndex((el) => el === newValue)];
    return this.locale;
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  openErrorDialog(err: Error): void {
    this.dialog.open(ExampleErrorDialog, {
      data: { err },
    });
  }

  handleCreationOrUpdate() {
    // Notify others
    this.refresh$.refresh();

    this.goBack();
  }

  onSubmit(): void {
    // Different request for different intention - Create Immobilie OR Edit Immobilie
    const request = this.id
      ? this.service.immobilienControllerAendereImmobilie({
          id: this.id,
          body: this.immobilieErstellenForm.value as ImmobilieAendernDto,
        })
      : this.service.immobilienControllerErstelleImmobilie({
          body: this.immobilieErstellenForm.value as ImmobilieErstellenDto,
        });

    request.pipe(take(1)).subscribe({
      next: () => this.handleCreationOrUpdate(),
      error: (err) => this.handleError(err),
    });
  }

  ngOnDestroy() {}
}
