import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'strasse-editor',
  templateUrl: './strasse-editor.component.html',
  styleUrl: './strasse-editor.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class StrasseEditorComponent {
  strasse = new FormControl('');
  updateStrasse(value: string) {
    this.strasse.setValue(value);
  }
}
