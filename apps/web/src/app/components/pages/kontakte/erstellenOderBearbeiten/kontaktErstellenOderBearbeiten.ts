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
import { KontakteService } from '../../../../api/services';
import {
  KontaktAendernDto,
  KontaktAntwortMitBeziehungenDto,
  KontaktErstellenDto,
} from '../../../../api/models';
import { postalCodeValidator } from '../../../form/postleitzahl/postalCodeValidator.directive';
import { LandEditorComponent } from '../../../form/land/land-editor.component';
import { LAENDER, Land, LOCALES } from '../../../form/land/laender';
import { ActivatedRoute, Router } from '@angular/router';
import { KontakteRefresh } from '../../../../services/kontakteRefresh.service';
import { MatDialog } from '@angular/material/dialog';
import { ExampleErrorDialog } from '../../../error/exampleError';
import { NameEditorComponent } from '../../../form/name/name-editor.component';
import { toSignal } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'kontakt-erstellen-oder-bearbeiten',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './kontaktErstellenOderBearbeiten.html',
  styleUrl: './kontaktErstellenOderBearbeiten.scss',
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
  ],
})
export class KontaktErstellenOderBearbeiten {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(KontakteService);
  public kontakteRefresh = inject(KontakteRefresh);
  readonly dialog = inject(MatDialog);
  id = '';

  // passed to Subcomponent
  laender = [...LAENDER, 'Großbritannien'];
  locales = [...LOCALES, 'GB'];
  initialLandId = 0;
  //
  land = this.laender[this.initialLandId];
  locale = this.locales[this.initialLandId];
  valueChanges: any;

  getLocale = () => {
    return this.locale;
  };

  kontaktErstellenForm = new FormGroup({
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
  });

  ngOnInit() {
    const routeSub = this.route.params.subscribe((params) => {
      this.id = params['id'];
    });

    if (this.id) {
      this.service
        .kontakteControllerKontakt({
          id: this.id as string,
        })
        .subscribe((val) => {
          this.kontaktErstellenForm.controls.name.setValue(val.name);

          this.kontaktErstellenForm.controls.strasse.setValue(val.strasse);

          this.kontaktErstellenForm.controls.hausnummer.setValue(
            val.hausnummer,
          );

          this.kontaktErstellenForm.controls.postleitzahl.setValue(
            val.postleitzahl,
          );

          this.kontaktErstellenForm.controls.stadt.setValue(val.stadt);

          this.kontaktErstellenForm.controls.land.setValue(val.land);
        });
    }

    // Validiere Postleitzahl erneut wenn sich Land ändert
    this.kontaktErstellenForm.controls.land.valueChanges.subscribe((val) => {
      this.setLocale(val);
      this.kontaktErstellenForm.controls.postleitzahl.updateValueAndValidity();
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
    const dialogRef = this.dialog.open(ExampleErrorDialog, {
      data: { err },
    });
  }

  onSubmit(): void {
    const request = this.id
      ? this.service.kontakteControllerAendereKontakte({
          id: this.id,
          body: this.kontaktErstellenForm.value as KontaktAendernDto,
        })
      : this.service.kontakteControllerErstelleKontakte({
          body: this.kontaktErstellenForm.value as KontaktErstellenDto,
        });

    request.subscribe({
      next: (data) => {
        console.log(data);
        this.kontakteRefresh.refresh();
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
        this.kontakteRefresh.refresh();
      },
    });
    this.goBack();
  }
}
