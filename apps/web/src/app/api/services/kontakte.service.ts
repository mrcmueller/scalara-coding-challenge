/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { KontaktAntwortMitBeziehungenDto } from '../models/kontakt-antwort-mit-beziehungen-dto';
import { kontakteControllerAendereKontakte } from '../fn/kontakte/kontakte-controller-aendere-kontakte';
import { KontakteControllerAendereKontakte$Params } from '../fn/kontakte/kontakte-controller-aendere-kontakte';
import { kontakteControllerErstelleKontakte } from '../fn/kontakte/kontakte-controller-erstelle-kontakte';
import { KontakteControllerErstelleKontakte$Params } from '../fn/kontakte/kontakte-controller-erstelle-kontakte';
import { kontakteControllerKontakt } from '../fn/kontakte/kontakte-controller-kontakt';
import { KontakteControllerKontakt$Params } from '../fn/kontakte/kontakte-controller-kontakt';
import { kontakteControllerKontakte } from '../fn/kontakte/kontakte-controller-kontakte';
import { KontakteControllerKontakte$Params } from '../fn/kontakte/kontakte-controller-kontakte';
import { kontakteControllerLoescheKontakte } from '../fn/kontakte/kontakte-controller-loesche-kontakte';
import { KontakteControllerLoescheKontakte$Params } from '../fn/kontakte/kontakte-controller-loesche-kontakte';

@Injectable({ providedIn: 'root' })
export class KontakteService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `kontakteControllerKontakte()` */
  static readonly KontakteControllerKontaktePath = '/kontakte';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `kontakteControllerKontakte()` instead.
   *
   * This method doesn't expect any request body.
   */
  kontakteControllerKontakte$Response(params?: KontakteControllerKontakte$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<KontaktAntwortMitBeziehungenDto>>> {
    return kontakteControllerKontakte(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `kontakteControllerKontakte$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  kontakteControllerKontakte(params?: KontakteControllerKontakte$Params, context?: HttpContext): Observable<Array<KontaktAntwortMitBeziehungenDto>> {
    return this.kontakteControllerKontakte$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<KontaktAntwortMitBeziehungenDto>>): Array<KontaktAntwortMitBeziehungenDto> => r.body)
    );
  }

  /** Path part for operation `kontakteControllerErstelleKontakte()` */
  static readonly KontakteControllerErstelleKontaktePath = '/kontakte';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `kontakteControllerErstelleKontakte()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  kontakteControllerErstelleKontakte$Response(params: KontakteControllerErstelleKontakte$Params, context?: HttpContext): Observable<StrictHttpResponse<KontaktAntwortMitBeziehungenDto>> {
    return kontakteControllerErstelleKontakte(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `kontakteControllerErstelleKontakte$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  kontakteControllerErstelleKontakte(params: KontakteControllerErstelleKontakte$Params, context?: HttpContext): Observable<KontaktAntwortMitBeziehungenDto> {
    return this.kontakteControllerErstelleKontakte$Response(params, context).pipe(
      map((r: StrictHttpResponse<KontaktAntwortMitBeziehungenDto>): KontaktAntwortMitBeziehungenDto => r.body)
    );
  }

  /** Path part for operation `kontakteControllerKontakt()` */
  static readonly KontakteControllerKontaktPath = '/kontakte/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `kontakteControllerKontakt()` instead.
   *
   * This method doesn't expect any request body.
   */
  kontakteControllerKontakt$Response(params: KontakteControllerKontakt$Params, context?: HttpContext): Observable<StrictHttpResponse<KontaktAntwortMitBeziehungenDto>> {
    return kontakteControllerKontakt(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `kontakteControllerKontakt$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  kontakteControllerKontakt(params: KontakteControllerKontakt$Params, context?: HttpContext): Observable<KontaktAntwortMitBeziehungenDto> {
    return this.kontakteControllerKontakt$Response(params, context).pipe(
      map((r: StrictHttpResponse<KontaktAntwortMitBeziehungenDto>): KontaktAntwortMitBeziehungenDto => r.body)
    );
  }

  /** Path part for operation `kontakteControllerLoescheKontakte()` */
  static readonly KontakteControllerLoescheKontaktePath = '/kontakte/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `kontakteControllerLoescheKontakte()` instead.
   *
   * This method doesn't expect any request body.
   */
  kontakteControllerLoescheKontakte$Response(params: KontakteControllerLoescheKontakte$Params, context?: HttpContext): Observable<StrictHttpResponse<KontaktAntwortMitBeziehungenDto>> {
    return kontakteControllerLoescheKontakte(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `kontakteControllerLoescheKontakte$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  kontakteControllerLoescheKontakte(params: KontakteControllerLoescheKontakte$Params, context?: HttpContext): Observable<KontaktAntwortMitBeziehungenDto> {
    return this.kontakteControllerLoescheKontakte$Response(params, context).pipe(
      map((r: StrictHttpResponse<KontaktAntwortMitBeziehungenDto>): KontaktAntwortMitBeziehungenDto => r.body)
    );
  }

  /** Path part for operation `kontakteControllerAendereKontakte()` */
  static readonly KontakteControllerAendereKontaktePath = '/kontakte/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `kontakteControllerAendereKontakte()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  kontakteControllerAendereKontakte$Response(params: KontakteControllerAendereKontakte$Params, context?: HttpContext): Observable<StrictHttpResponse<KontaktAntwortMitBeziehungenDto>> {
    return kontakteControllerAendereKontakte(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `kontakteControllerAendereKontakte$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  kontakteControllerAendereKontakte(params: KontakteControllerAendereKontakte$Params, context?: HttpContext): Observable<KontaktAntwortMitBeziehungenDto> {
    return this.kontakteControllerAendereKontakte$Response(params, context).pipe(
      map((r: StrictHttpResponse<KontaktAntwortMitBeziehungenDto>): KontaktAntwortMitBeziehungenDto => r.body)
    );
  }

}
