import { Component } from '@angular/core';

@Component({
  selector: 'homepage',
  templateUrl: './homePage.html',
  styleUrl: './homePage.scss',
  standalone: true,
})
export class HomePage {
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
