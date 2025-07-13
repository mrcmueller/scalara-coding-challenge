import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'date-picker',
  templateUrl: './datum.component.html',
  styleUrl: './datum.component.scss',
  imports: [MatDatepickerModule, MatFormFieldModule],
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatumComponent {
  constructor() {}
}
