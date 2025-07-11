import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'web';
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit() {
    console.log(
      `${Math.floor(Math.random() * 100)} Initialized: ${this.constructor.name}`,
    );
    // this.router.events.subscribe((e) => console.log(e));
  }

  ngOnDestroy() {
    console.log(
      `${Math.floor(Math.random() * 100)} Destroyed: ${this.constructor.name}`,
    );
  }
}
