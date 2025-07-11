import { Component, inject, Signal } from '@angular/core';
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
  ImmobilieErstellenDto,
  KontaktAntwortMitBeziehungenDto,
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
  public immobilienRefresh = inject(ImmobilienRefresh);
  readonly dialog = inject(MatDialog);

  laender = [...LAENDER, 'Großbritannien'];
  locales = [...LOCALES, 'GB'];
  initialLandId = 0;
  land = this.laender[this.initialLandId];
  locale = this.locales[this.initialLandId];
  valueChanges: any;

  getLocale = () => {
    return this.locale;
  };

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

  setLocale(newValue: any): string {
    this.locale = this.locales[this.laender.findIndex((el) => el === newValue)];
    return this.locale;
  }

  constructor() {
    this.immobilieErstellenForm.controls.land.valueChanges.subscribe((val) => {
      const newLocale = this.setLocale(val);
      this.immobilieErstellenForm.controls.postleitzahl.updateValueAndValidity();
    });
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  openErrorDialog(err: Error): void {
    const dialogRef = this.dialog.open(ExampleErrorDialog, {
      data: { err },
    });
  }

  onSubmit(): void {
    this.service
      .immobilienControllerErstelleImmobilie({
        body: this.immobilieErstellenForm.value as ImmobilieErstellenDto,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.immobilienRefresh.refresh();
        },
        error: (err) => {
          this.openErrorDialog(err);
          console.error('Error occurred:', err);
          if (err?.status) {
            console.error('Error status:', err.status);
          }
          if (err?.response) {
            console.error('Error body:', err.response);
          }
        },
      });
    this.goBack();
  }
}
