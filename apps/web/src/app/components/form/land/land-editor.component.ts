import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

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
  laender = ['Deutschland', 'Italien', 'Frankreich'];
  land = new FormControl('Deutschland');
  updateLand(value: string) {
    this.land.setValue(value);
  }
}
