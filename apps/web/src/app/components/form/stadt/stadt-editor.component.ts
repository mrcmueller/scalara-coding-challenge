import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'stadt-editor',
  templateUrl: './stadt-editor.component.html',
  styleUrl: './stadt-editor.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],
})
export class StadtEditorComponent {
  stadt = new FormControl('');
  updateStadt(value: string) {
    this.stadt.setValue(value);
  }
}
