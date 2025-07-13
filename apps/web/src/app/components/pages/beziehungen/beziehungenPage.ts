import { Component } from '@angular/core';
import { BeziehungenTable } from '../../tables/beziehungen/BeziehungenTable';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'beziehungen',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './beziehungenPage.html',
  styleUrl: './beziehungenPage.scss',
  imports: [BeziehungenTable],
})
export class BeziehungenPage {
  protected title = 'web';

  ngOnInit() {}

  ngOnDestroy() {}
}
