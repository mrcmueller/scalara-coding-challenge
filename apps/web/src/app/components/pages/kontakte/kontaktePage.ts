import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { KontakteService } from '../../../api/services';
import { KontakteTable } from '../../tables/KontakteTable';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'kontakte',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './kontaktePage.html',
  styleUrl: './kontaktePage.scss',
  imports: [MatButtonModule, KontakteTable],
})
export class KontaktePage {
  protected title = 'web';
}
