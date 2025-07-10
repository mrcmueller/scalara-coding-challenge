import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

export type Land = 'Deutschland' | 'Italien' | 'Frankreich';
export type LocalesType = 'DE' | 'IT' | 'FR';
const Locales = ['DE', 'IT', 'FR'];
const laender = ['Deutschland', 'Italien', 'Frankreich'];
export { laender, Locales };

@Component({
  selector: 'land-editor',
  templateUrl: './land-editor.component.html',
  styleUrl: './land-editor.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class LandEditorComponent {
  laender = laender;

  @Input() control = new FormControl('Deutschland') as FormControl<Land>;
  updateValue(value: Land) {
    this.control.setValue(value);
  }
}
