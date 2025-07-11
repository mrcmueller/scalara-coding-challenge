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
    // this.router.events.subscribe((e) => console.log(e));
  }

  ngOnDestroy() {}
}
