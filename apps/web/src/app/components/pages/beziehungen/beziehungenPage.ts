import { Component } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'beziehungen',
  standalone: true,
  // imports: [RouterOutlet],
  templateUrl: './beziehungenPage.html',
  styleUrl: './beziehungenPage.scss',
})
export class BeziehungenPage {
  protected title = 'web';

  ngOnInit() {
    console.log(
      `${Math.floor(Math.random() * 100)} Initialized: ${this.constructor.name}`,
    );
  }

  ngOnDestroy() {
    console.log(
      `${Math.floor(Math.random() * 100)} Destroyed: ${this.constructor.name}`,
    );
  }
}
