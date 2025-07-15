import { Component, inject, signal, WritableSignal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BeziehungenService } from '../../../../api/services';
import { BeziehungAntwortDto } from '../../../../api/models';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ExampleErrorDialog } from '../../../error/exampleError';
import { take } from 'rxjs';
import { BeziehungenRefresh } from '../../../../services/beziehungenRefresh.service';

@Component({
  selector: 'beziehung-detail',
  styleUrl: './beziehungDetail.scss',
  standalone: true,
  templateUrl: './beziehungDetail.html',
  imports: [MatButtonModule],
})
export class BeziehungDetail {
  private route = inject(ActivatedRoute);
  private service = inject(BeziehungenService);
  private refresh$ = inject(BeziehungenRefresh);
  private id = this.getId();
  data: WritableSignal<null | BeziehungAntwortDto> = signal(null);
  readonly dialog = inject(MatDialog);
  getId(): string {
    return this.route.snapshot.params['beziehungId'];
  }
  fetchData() {
    this.service
      .beziehungenControllerBeziehung({ id: this.id })
      .pipe(take(1))
      .subscribe({
        next: (res) => this.handleFetchedData(res),
        error: (error) => this.handleError(error),
      });
  }

  dateStringToDatum(dateString: string) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
    return formattedDate;
  }

  handleFetchedData(res: BeziehungAntwortDto) {
    const newVal = { ...res };

    newVal.startdatum = this.dateStringToDatum(res.startdatum);
    newVal.enddatum = this.dateStringToDatum(res.enddatum);
    this.data.set(newVal);
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
