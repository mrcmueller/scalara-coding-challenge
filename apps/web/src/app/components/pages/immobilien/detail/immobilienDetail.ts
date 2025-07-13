import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImmobilienService } from '../../../../api/services';
import { ImmobilieAntwortMitBeziehungenDto } from '../../../../api/models';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ExampleErrorDialog } from '../../../error/exampleError';
import { take } from 'rxjs';
import { ImmobilienRefresh } from '../../../../services/immobilienRefresh.service';

@Component({
  selector: 'immobilie-detail',
  styleUrl: './immobilienDetail.scss',
  standalone: true,
  templateUrl: './immobilienDetail.html',
  imports: [MatButtonModule],
})
export class ImmobilienDetail {
  private route = inject(ActivatedRoute);
  private service = inject(ImmobilienService);
  private refresh$ = inject(ImmobilienRefresh);
  private id = this.getId();
  data: WritableSignal<null | ImmobilieAntwortMitBeziehungenDto> = signal(null);
  readonly dialog = inject(MatDialog);
  getId(): string {
    return this.route.snapshot.params['immobilienId'];
  }
  fetchData() {
    this.service
      .immobilienControllerImmobilie({ id: this.id })
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
