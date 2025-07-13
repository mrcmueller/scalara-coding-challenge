import { Component, inject } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  BeziehungenService,
  ImmobilienService,
  KontakteService,
} from '../../../../api/services';
import {
  BeziehungAntwortDto,
  ImmobilieAntwortMitBeziehungenDto,
  KontaktAntwortDto,
  KontaktAntwortMitBeziehungenDto,
} from '../../../../api/models';
import { ActivatedRoute, Router } from '@angular/router';
import { BeziehungenRefresh } from '../../../../services/beziehungenRefresh.service';
import { MatDialog } from '@angular/material/dialog';
import { ExampleErrorDialog } from '../../../error/exampleError';
import { take } from 'rxjs';
import {
  SelectionComponent,
  SelectItems,
} from '../../../form/selection/selection.component';
import { ZeitraumComponent } from '../../../form/datum/zeitraum.component';

type BeziehungstypValue = 1 | 2 | 3;
type DienstleistungstypValue = 1 | 2 | 3;

@Component({
  selector: 'beziehung-erstellen-oder-bearbeiten',
  standalone: true,
  templateUrl: './beziehungErstellenOderBearbeiten.html',
  styleUrl: './beziehungErstellenOderBearbeiten.scss',
  imports: [
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectionComponent,
    ZeitraumComponent,
  ],
})
export class BeziehungErstellenOderBearbeiten {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly service = inject(BeziehungenService);
  private readonly kontakteService = inject(KontakteService);
  private readonly immobilienService = inject(ImmobilienService);
  private readonly refresh$ = inject(BeziehungenRefresh);
  private readonly dialog = inject(MatDialog);
  public readonly id = this.getId();
  private readonly required = Validators.required;
  private readonly nullable = Validators.nullValidator;

  public showDienstleistungstyp: boolean = false;

  public kontakte: SelectItems<string> | null = null;
  public immobilien: SelectItems<string> | null = null;
  public readonly beziehungstypen: SelectItems<BeziehungstypValue> = [
    { value: 1, name: 'Eigentümer' },
    { value: 2, name: 'Mieter' },
    { value: 3, name: 'Dienstleister' },
  ];
  public readonly dienstleistungstypen: SelectItems<DienstleistungstypValue> = [
    { value: 1, name: 'Gartenarbeit' },
    { value: 2, name: 'Reinigung' },
    { value: 3, name: 'Sanitär' },
  ];

  public beziehungErstellenForm = new FormGroup({
    kontaktId: new FormControl(null, [Validators.required]) as FormControl<
      string | null
    >,
    immobilienId: new FormControl(null, [Validators.required]) as FormControl<
      string | null
    >,
    beziehungstyp: new FormControl(null, [
      Validators.required,
    ]) as FormControl<BeziehungstypValue | null>,
    dienstleistungstyp: new FormControl(null, [
      this.nullable,
    ]) as FormControl<DienstleistungstypValue | null>,
    startdatum: new FormControl<Date | null>(null, [Validators.required]),
    enddatum: new FormControl<Date | null>(null, [Validators.required]),
  });

  getId(): string | undefined {
    return this.route.snapshot.params['beziehungId'];
  }

  controlDienstleistungstyp() {
    // Zeige Dienstleistungstyp nur, wenn Beziehungstyp 3 ist, andernfalls reset den Dienstleistungstyp
    this.beziehungErstellenForm.controls.beziehungstyp.valueChanges.subscribe(
      (val) => {
        this.showDienstleistungstyp = val === 3;

        this.showDienstleistungstyp ? this.setRequired() : this.setNullable();
      },
    );
  }

  setRequired() {
    const control = this.beziehungErstellenForm.controls.dienstleistungstyp;
    control.setValidators(this.required);
    control.updateValueAndValidity();
  }

  setNullable() {
    const control = this.beziehungErstellenForm.controls.dienstleistungstyp;
    control.setValidators(this.nullable);
    control.updateValueAndValidity();
  }

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

  fetchKontakte() {
    this.kontakteService
      .kontakteControllerKontakte()
      .pipe(take(1))
      .subscribe({
        next: (res) => (this.kontakte = this.handleFetchedKontakte(res)),
        error: (error) => this.handleError(error),
      });
  }

  fetchImmobilien() {
    this.immobilienService
      .immobilienControllerImmobilien()
      .pipe(take(1))
      .subscribe({
        next: (res) => (this.immobilien = this.handleFetchedImmobilien(res)),
        error: (error) => this.handleError(error),
      });
  }

  handleFetchedData(res: BeziehungAntwortDto) {
    const formattedData = {
      id: res.id,
      kontaktId: res.kontakt.id,
      immobilienId: res.immobilie.id,
      beziehungstyp: res.beziehungstyp,
      dienstleistungstyp: res.dienstleistungstyp,
      startdatum: res.startdatum,
      enddatum: res.enddatum,
    };

    // fill forms with fetched data
    const controls = this.beziehungErstellenForm.controls;

    for (const key in controls) {
      if (key in formattedData) {
        const formControl = (controls as any)[key];
        const newValue = (formattedData as any)[key];
        formControl.setValue(newValue);
      }
    }
  }

  handleFetchedKontakte(
    res: KontaktAntwortMitBeziehungenDto[],
  ): SelectItems<string> {
    return res.map((el) => {
      return { value: el.id, name: el.name };
    });
  }

  handleFetchedImmobilien(
    res: ImmobilieAntwortMitBeziehungenDto[],
  ): SelectItems<string> {
    return res.map((el) => {
      return { value: el.id, name: el.name };
    });
  }

  handleError(err: Error) {
    // error not handled fully because of time
    this.openErrorDialog(err);
  }

  ngOnInit() {
    this.controlDienstleistungstyp();
    // Only executes if id is existing in URL which means we want to edit an Beziehung
    this.fetchData();

    this.fetchKontakte();
    this.fetchImmobilien();
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
    // Different request for different intention - Create Beziehung OR Edit Beziehung
    const request = this.id
      ? this.service.beziehungenControllerAendereBeziehung({
          id: this.id,
          body: this.beziehungErstellenForm.value as any,
        })
      : this.service.beziehungenControllerErstelleBeziehung({
          body: this.beziehungErstellenForm.value as any,
        });

    request.pipe(take(1)).subscribe({
      next: () => this.handleCreationOrUpdate(),
      error: (err) => this.handleError(err),
    });
    this.goBack();
  }

  ngOnDestroy() {}
}
