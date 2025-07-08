import { HttpClient } from '@angular/common/http';
import { Component, inject, Injectable, signal } from '@angular/core';
import { ImmobilienService } from '../../../api/services';
// import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'immobilien-root',
  // imports: [RouterOutlet],
  templateUrl: './immobilien.html',
  styleUrl: './immobilien.scss',
})
export class ImmobilienPage {
  private http = inject(HttpClient);
  protected title = 'web';
  data = ImmobilienService.ImmobilienControllerImmobilienPath;
  constructor() {}
}
