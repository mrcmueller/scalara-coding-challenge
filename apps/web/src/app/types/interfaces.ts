import { DataSource } from '@angular/cdk/table';

export interface Delete {
  delete: (id: string, event: Event) => void;
}

export interface ListDataSource<T> extends DataSource<T> {
  delete: (id: string, event: Event) => void;
  visit: (id: string, event: Event) => void;
}
