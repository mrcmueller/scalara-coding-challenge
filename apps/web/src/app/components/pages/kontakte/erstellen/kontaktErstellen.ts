import { Component } from '@angular/core';
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
import {
  laender,
  Land,
  LandEditorComponent,
} from '../../../form/land/land-editor.component';
import { StadtEditorComponent } from '../../../form/stadt/stadt-editor.component';
import { StrasseEditorComponent } from '../../../form/strasse/strasse-editor.component';
import { KontakteService } from '../../../../api/services';
import { KontaktErstellenDto } from '../../../../api/models';
import validator from 'validator';
import { postalCodeValidator } from '../../../form/postleitzahl/postalCodeValidator.directive';

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
  kontaktErstellenForm = new FormGroup({
    name: new FormControl('', Validators.required) as FormControl<string>,
    strasse: new FormControl('', Validators.required) as FormControl<string>,
    hausnummer: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d/),
    ]) as FormControl<string>,
    postleitzahl: new FormControl('', [
      Validators.required,
      postalCodeValidator('DE'),
    ]) as FormControl<string>,
    stadt: new FormControl('', Validators.required) as FormControl<string>,
    land: new FormControl(laender[0], Validators.required) as FormControl<Land>,
  });

  service: KontakteService;

  constructor(kontakteService: KontakteService) {
    this.service = kontakteService;

    console.log(validator.isPostalCode('DE', 'DE'));
  }

  onSubmit() {
    this.service
      .kontakteControllerErstelleKontakte({
        body: this.kontaktErstellenForm.value as KontaktErstellenDto,
      })
      .subscribe();
    console.log('Submit Button wurde gedrückt');
    alert('Submit Button wurde gedrückt');
  }
}
