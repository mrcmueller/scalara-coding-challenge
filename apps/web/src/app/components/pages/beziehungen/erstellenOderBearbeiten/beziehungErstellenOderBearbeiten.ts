import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { PostleitzahlEditorComponent } from '../../../form/postleitzahl/postleitzahl-editor.component';
import { HausnummerEditorComponent } from '../../../form/hausnummer/hausnummer-editor.component';
import { StadtEditorComponent } from '../../../form/stadt/stadt-editor.component';
import { StrasseEditorComponent } from '../../../form/strasse/strasse-editor.component';
import { BeziehungenService } from '../../../../api/services';
import {
  BeziehungAendernDto,
  BeziehungAntwortDto,
  BeziehungErstellenDto,
} from '../../../../api/models';
import { postalCodeValidator } from '../../../form/postleitzahl/postalCodeValidator.directive';
import { LandEditorComponent } from '../../../form/land/land-editor.component';
import { LAENDER, Land, LOCALES } from '../../../form/land/laender';
import { ActivatedRoute, Router, RouteReuseStrategy } from '@angular/router';
import { BeziehungenRefresh } from '../../../../services/beziehungenRefresh.service';
import { MatDialog } from '@angular/material/dialog';
import { ExampleErrorDialog } from '../../../error/exampleError';
import { NameEditorComponent } from '../../../form/name/name-editor.component';
import { take } from 'rxjs';

@Component({
  selector: 'beziehung-erstellen-oder-bearbeiten',
  standalone: true,
  templateUrl: './beziehungErstellenOderBearbeiten.html',
  styleUrl: './beziehungErstellenOderBearbeiten.scss',
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    NameEditorComponent,
    StrasseEditorComponent,
    HausnummerEditorComponent,
    PostleitzahlEditorComponent,
    StadtEditorComponent,
    LandEditorComponent,
  ],
})
export class BeziehungErstellenOderBearbeiten {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(BeziehungenService);
  private refresh$ = inject(BeziehungenRefresh);
  readonly dialog = inject(MatDialog);

  id = this.getId();

  getId(): string | undefined {
    return this.route.snapshot.params['beziehungId'];
  }

  beziehungErstellenForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.pattern(/.*[A-Za-z].*/),
    ]) as FormControl<string>,
    strasse: new FormControl('', [
      Validators.pattern(/.*[A-Za-z].*/),
      Validators.required,
    ]) as FormControl<string>,
    hausnummer: new FormControl('', [
      Validators.required,
      Validators.pattern(/\d/),
    ]) as FormControl<string>,
    postleitzahl: new FormControl('', [
      Validators.required,
      postalCodeValidator(this.getLocale),
    ]) as FormControl<string>,
    stadt: new FormControl('', [
      Validators.pattern(/.*[A-Za-z].*/),
      Validators.required,
    ]) as FormControl<string>,
    land: new FormControl(this.land, Validators.required) as FormControl<Land>,
  });

  fetchData() {
    if (this.id) {
      this.service
        .beziehungenControllerBeziehung({ id: this.id })
        .pipe(take(1))
        .subscribe({
          next: (res) => this.handleFetchedData(res),
          error: (error) => this.handleError(error),
        });
    }
  }

  handleFetchedData(res: BeziehungAntwortDto) {
    // fill forms with fetched data
    const controls = this.beziehungErstellenForm.controls;

    for (const key in controls) {
      if (key in res) {
        const formControl = (controls as any)[key];
        const newValue = (res as any)[key];
        formControl.setValue(newValue);
      }
    }
  }

  handleError(err: Error) {
    // error not handled fully because of time
    this.openErrorDialog(err);
  }

  ngOnInit() {
    // Only executes if id is existing in URL which means we want to edit an Beziehung
    this.fetchData();
  }

  goBack(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  openErrorDialog(err: Error): void {
    this.dialog.open(ExampleErrorDialog, {
      data: { err },
    });
  }

  handleCreationOrUpdate() {
    // Notify others
    this.refresh$.next();

    this.goBack();
  }

  onSubmit(): void {
    // Different request for different intention - Create Kontakt OR Edit Kontakt
    const request = this.id
      ? this.service.beziehungenControllerAendereBeziehung({
          id: this.id,
          body: this.beziehungErstellenForm.value as BeziehungAendernDto,
        })
      : this.service.beziehungenControllerErstelleBeziehung({
          body: this.beziehungErstellenForm.value as BeziehungErstellenDto,
        });

    request.pipe(take(1)).subscribe({
      next: () => this.handleCreationOrUpdate(),
      error: (err) => this.handleError(err),
    });
    this.goBack();
  }

  ngOnDestroy() {}
}
