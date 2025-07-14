import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'date-range-picker',
  templateUrl: './zeitraum.component.html',
  styleUrl: './zeitraum.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ZeitraumComponent {
  @Input() label: string | null = 'Zeitraum';
  @Input() placeholderStart = 'Startdatum';
  @Input() placeholderEnd = 'Enddatum';
  @Input() hint: string | null = 'MM/DD/YYYY – MM/DD/YYYY';
  @Input() startdatum: Date | null = null;
  @Input() enddatum: Date | null = null;
  @Input() controlStartdatum = new FormControl() as FormControl<Date | null>;
  @Input() controlEnddatum = new FormControl() as FormControl<Date | null>;
  @Input() formGroup?: FormGroup;

  constructor() {}
}
