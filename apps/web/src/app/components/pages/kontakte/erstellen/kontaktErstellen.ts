import { Component } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NameEditorComponent } from '../../../form/name/name-editor.component';
import { PostleitzahlEditorComponent } from '../../../form/postleitzahl/postleitzahl-editor.component';
import { HausnummerEditorComponent } from '../../../form/hausnummer/hausnummer-editor.component';
import { LandEditorComponent } from '../../../form/land/land-editor.component';
import { StadtEditorComponent } from '../../../form/stadt/stadt-editor.component';
import { StrasseEditorComponent } from '../../../form/strasse/strasse-editor.component';

// import { RouterOutlet } from '@angular/router';

type Land = 'Deutschland' | 'Italien' | 'Frankreich';

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
    name: new FormControl(''),
    strasse: new FormControl(''),
    hausnummer: new FormControl(''),
    postleitzahl: new FormControl(''),
    stadt: new FormControl(''),
    land: new FormControl('Deutschland'),
  });

  onSubmit() {
    console.log('Submit Button wurde gedrückt');
    alert('Submit Button wurde gedrückt');
  }
}
