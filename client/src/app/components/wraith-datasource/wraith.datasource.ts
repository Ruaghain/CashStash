import {Observable} from 'rxjs';

export interface WraithDatasource<T> {
  entityName: string;

  insert(record: T): Observable<T>;

  update(id: string, record: T): Observable<T>;

  remove(id: string): Observable<any>;

  get(id: string): Observable<T>; //can I change this?
  getAll(): Observable<T[]>;
}
