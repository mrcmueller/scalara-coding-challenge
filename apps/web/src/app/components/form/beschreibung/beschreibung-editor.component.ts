import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'beschreibung-editor',
  templateUrl: './beschreibung-editor.component.html',
  styleUrl: './beschreibung-editor.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class BeschreibungEditorComponent {
  @Input() control: FormControl<string> = new FormControl(
    '',
  ) as FormControl<string>;
}
