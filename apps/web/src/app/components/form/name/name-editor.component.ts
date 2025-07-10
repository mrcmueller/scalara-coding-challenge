import { Component } from '@angular/core';
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
  name = new FormControl('');
  updateName() {
    // this.name.setValue('Nancy');
  }
}
