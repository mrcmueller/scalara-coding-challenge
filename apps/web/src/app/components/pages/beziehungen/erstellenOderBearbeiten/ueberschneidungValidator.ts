import {
  AbstractControl,
  AsyncValidatorFn,
  ValidationErrors,
} from '@angular/forms';
import { MieterUeberschneidungService } from '../../../../api/services';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, switchMap, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UeberschneidungValidationService {
  service = inject(MieterUeberschneidungService);

  public validator = (id?: string): AsyncValidatorFn => {
    console.log('exec1');
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const beziehungstyp = control.get('beziehungstyp')?.value;
      const startDatum = control.get('startdatum')?.value;
      const endDatum = control.get('enddatum')?.value;
      const immobilienId = control.get('immobilienId')?.value;

      console.log('updates: ', {
        beziehungstyp,
        startDatum,
        endDatum,
        immobilienId,
      });

      if (!(beziehungstyp === 2) || !startDatum || !endDatum || !immobilienId) {
        console.log('nulled');

        return of(null);
      }

      return timer(400).pipe(
        switchMap(() => {
          return this.service
            .mieterUeberschneidungControllerBeziehungen({
              body: {
                id: id as string,
                immobilienId,
                startdatum: new Date(startDatum).toISOString(),
                enddatum: new Date(endDatum).toISOString(),
              },
            })
            .pipe(
              map((val) =>
                val.ueberschneidung
                  ? {
                      ueberschneidung:
                        'Der Zeitraum überschneidet sich mit einem anderen Mietvertrag.',
                    }
                  : null,
              ),
            );
        }),
      );
    };
  };
}
