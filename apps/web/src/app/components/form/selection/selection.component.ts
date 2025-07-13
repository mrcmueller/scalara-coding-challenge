import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
@Component({
  selector: 'selection',
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.scss',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
  ],
})
export class SelectionComponent<T> {
  @Input() label: string = 'Label';
  @Input() items: SelectItems<T> | null = [];
  @Input() control = new FormControl() as FormControl<T | null>;

  constructor() {}
}

export type SelectItem<T> = { value: T; name: string };
export type SelectItems<T> = SelectItem<T>[];
