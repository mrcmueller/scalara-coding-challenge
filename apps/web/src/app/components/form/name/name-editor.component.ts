import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'name-editor',
  templateUrl: './name-editor.component.html',
  styleUrl: './name-editor.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class NameEditorComponent {
  @Input() control: FormControl<string> = new FormControl(
    '',
  ) as FormControl<string>;
}
