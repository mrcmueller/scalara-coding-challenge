import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import {
  FloatLabelType,
  MatFormFieldModule,
} from '@angular/material/form-field';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { NameEditorComponent } from '../../../form/name/name-editor.component';

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
    MatCheckboxModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    NameEditorComponent,
  ],
})
export class KontaktErstellen {
  laender = ['Deutschland', 'Italien', 'Frankreich'];
  selectedValue: Land = 'Deutschland';
  name = new FormControl('');
  strasse = new FormControl('');
  hausnummer = new FormControl('');
  postleitzahl = new FormControl('');
  stadt = new FormControl('');
  land = new FormControl('Deutschland');
}
