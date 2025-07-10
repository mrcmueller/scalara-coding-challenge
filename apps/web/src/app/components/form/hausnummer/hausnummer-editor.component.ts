import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'hausnummer-editor',
  templateUrl: './hausnummer-editor.component.html',
  styleUrl: './hausnummer-editor.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class HausnummerEditorComponent {
  @Input() control!: FormControl<string>;
  updateValue(value: string) {
    this.control.setValue(value);
  }
}
