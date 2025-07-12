import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { KontakteService } from '../../../../api/services';
import { KontaktAntwortMitBeziehungenDto } from '../../../../api/models';
import { MatButtonModule } from '@angular/material/button';
import { KontakteRefresh } from '../../../../services/kontakteRefresh.service';
import { MatDialog } from '@angular/material/dialog';
import { ExampleErrorDialog } from '../../../error/exampleError';
import { take } from 'rxjs';

@Component({
  selector: 'kontakt-detail',
  styleUrl: './kontaktDetail.scss',
  standalone: true,
  templateUrl: './kontaktDetail.html',
  imports: [MatButtonModule],
})
export class KontaktDetail {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private service = inject(KontakteService);
  private refresh$ = inject(KontakteRefresh);
  private id = this.getId();
  data: WritableSignal<null | KontaktAntwortMitBeziehungenDto> = signal(null);
  readonly dialog = inject(MatDialog);
  getId(): string {
    return this.route.snapshot.params['id'];
  }
  fetchData() {
    this.service
      .kontakteControllerKontakt({ id: this.id })
      .pipe(take(1))
      .subscribe({
        next: (res) => this.data.set(res),
        error: (error) => this.handleError(error),
      });
  }
  openErrorDialog(err: Error): void {
    this.dialog.open(ExampleErrorDialog, {
      data: { err },
    });
  }
  handleError(err: Error) {
    // error not handled fully because of time
    this.openErrorDialog(err);
  }
  subscribeToChanges() {
    this.refresh$.subscribe(() => this.fetchData());
  }
  ngOnInit() {
    this.fetchData();
    this.subscribeToChanges();
  }
  ngOnDestroy() {}
}
