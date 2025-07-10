import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'postleitzahl-editor',
  templateUrl: './postleitzahl-editor.component.html',
  styleUrl: './postleitzahl-editor.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class PostleitzahlEditorComponent {
  @Input() control: FormControl<string> = new FormControl(
    '',
  ) as FormControl<string>;
}
