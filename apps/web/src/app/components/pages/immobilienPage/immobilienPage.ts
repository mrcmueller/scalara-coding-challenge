import { Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule, JsonPipe } from '@angular/common';
import { ImmobilienService } from '../../../api/services';

@Component({
  selector: 'immobilien-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './immobilienPage.html',
  styleUrl: './immobilienPage.scss',
})
export class ImmobilienPage {
  // immobilienSignal: Signal<any>;

  constructor(service: ImmobilienService) {
    // this.immobilienSignal = toSignal(service.immobilienControllerImmobilien());
  }
}
