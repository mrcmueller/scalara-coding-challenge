import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { NameEditorComponent } from '../../../form/name/name-editor.component';
import { PostleitzahlEditorComponent } from '../../../form/postleitzahl/postleitzahl-editor.component';
import { HausnummerEditorComponent } from '../../../form/hausnummer/hausnummer-editor.component';
import { StadtEditorComponent } from '../../../form/stadt/stadt-editor.component';
import { StrasseEditorComponent } from '../../../form/strasse/strasse-editor.component';
import { KontakteService } from '../../../../api/services';
import { KontaktErstellenDto } from '../../../../api/models';
import { postalCodeValidator } from '../../../form/postleitzahl/postalCodeValidator.directive';
import { Subject } from 'rxjs';
import { LandEditorComponent } from '../../../form/land/land-editor.component';
import {
  Laender,
  LAENDER,
  Land,
  Locale,
  Locales,
  LOCALES,
} from '../../../form/land/laender';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'kontakt-erstellen',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './kontaktErstellen.html',
  styleUrl: './kontaktErstellen.scss',
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
export class KontaktErstellen {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(KontakteService);
  // passed to Subcomponent
  laender = LAENDER;
  locales = LOCALES;
  initialLandId = 0;
  localeSubject: Subject<string> = new Subject<string>();
  //
  land = this.laender[this.initialLandId];
  locale = this.locales[this.initialLandId];
  valueChanges: any;

  getLocale = () => {
    console.log('locale fetched via getter function: ', this.locale);
    return this.locale;
  };

  kontaktErstellenForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/.*[A-Za-z].*/),
    ]) as FormControl<string>,
    strasse: new FormControl('', Validators.required) as FormControl<string>,
    hausnummer: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d/),
    ]) as FormControl<string>,
    postleitzahl: new FormControl('', [
      Validators.required,
      postalCodeValidator(this.getLocale),
    ]) as FormControl<string>,
    stadt: new FormControl('', Validators.required) as FormControl<string>,
    land: new FormControl(this.land, Validators.required) as FormControl<Land>,
  });

  setLocale(newValue: any): string {
    this.locale = this.locales[this.laender.findIndex((el) => el === newValue)];
    this.localeSubject.next(this.locale);
    return this.locale;
  }

  constructor(kontakteService: KontakteService) {
    // Revalidate PostalCode Input when Land was changed
    this.kontaktErstellenForm.controls.land.valueChanges.subscribe((val) => {
      const newLocale = this.setLocale(val);
      console.log(newLocale);
      //     control.reset(control.value);
      // control.setErrors(null);
      const currentValue =
        this.kontaktErstellenForm.controls.postleitzahl.updateValueAndValidity();
    });
  }

  onSubmit() {
    this.service
      .kontakteControllerErstelleKontakte({
        body: this.kontaktErstellenForm.value as KontaktErstellenDto,
      })
      .subscribe();
    this.router.navigate(['kontakte']).then(() => {
      window.location.reload();
    });
  }
}
