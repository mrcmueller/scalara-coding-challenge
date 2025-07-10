import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Subject } from 'rxjs';
import { LAENDER, Land, LOCALES } from './laender';
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
  @Input() laender: string[] = LAENDER;
  @Input() locales: string[] = LOCALES;
  @Input() initalLandId: number = 0;
  locale = this.locales[this.initalLandId];

  @Input() control = new FormControl(
    LAENDER[this.initalLandId],
  ) as FormControl<Land>;

  constructor() {}
}
