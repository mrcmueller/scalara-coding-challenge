import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'example-root',
  imports: [RouterOutlet],
  templateUrl: './example.html',
  styleUrl: './example.scss',
})
export class Exammple {
  protected title = 'web';
}
