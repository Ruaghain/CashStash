import {WraithDatasource} from './wraith.datasource';
import {WraithBaseRequest} from './wraith.base-request';
import {catchError, finalize, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

//TODO: Need to figure out how to create a custom parser for dealing with the response, specific to my application.
export class WraithRestDatasource<T> extends WraithBaseRequest implements WraithDatasource<T> {

  constructor(private httpClient: HttpClient, public entityName: string) {
    super();
  }

  /**
   * Insert a record for the given entity, and provided data.
   *
   * @param {T} record The record information that you wish to insert.
   * @returns {Observable<T>}
   */
  insert(record: T): Observable<T> {
    console.debug('Inserting a new record.');
    const body = JSON.stringify(record);
    return this.httpClient.post(this.baseUrl + '/' + this.entityName, body, {headers: super.getAuthHeaders()})
      .pipe(map((data: any) => data.result),
        catchError((error: HttpErrorResponse) => {
          return Observable.throw(error.message)
        }), finalize(() => {
          console.debug('Finished inserting new record.');
        }));
  }

  /**
   * Update the entity with the provided data, and id.
   *
   * @param {string} id The 'id' of the record which you wish to update.
   * @param {T} record The data which you wish to update on the record.
   * @returns {Observable<T>}
   */
  update(id: string, record: T): Observable<T> {
    console.debug('Updating an existing record.');
    const body = JSON.stringify(record);
    return this.httpClient.put(this.baseUrl + '/' + this.entityName + '/' + id, body, {headers: super.getAuthHeaders()})
      .pipe(map((data: any) => data.result),
        catchError((error: HttpErrorResponse) => {
          return Observable.throw(error.message)
        }), finalize(() => {
          console.debug('Finished updating existing record.')
        }));
  }

  /**
   * Remove the record for the given entity, for the provided id.
   *
   * @param {string} id The 'id' of the required record you wish to delete.
   * @returns {Observable<any>}
   */
  remove(id: string): Observable<any> {
    console.debug('Deleting existing record.');
    return this.httpClient.delete(this.baseUrl + '/' + this.entityName + '/' + id, {headers: super.getAuthHeaders()})
      .pipe(map((data: any) => data.result),
        catchError((error: HttpErrorResponse) => {
          return Observable.throw(error.message)
        }), finalize(() => {
          console.debug('Finished deleting existing record.')
        }));
  }

  /**
   * Get a specific record for the given entity, for the given id value.
   *
   * @param {string} id The 'id' of the required record.
   * @returns {Observable<T>}
   */
  get(id: string): Observable<T> {
    console.debug('Getting specific record.');
    return this.httpClient.get(this.baseUrl + '/' + this.entityName + '/' + id, {headers: super.getAuthHeaders()})
      .pipe(map((data: any) => data.result[0]),
        map((record: T) => {
          return record;
        }), catchError((error: HttpErrorResponse) => {
          return Observable.throw(error.message)
        }), finalize(() => {
          console.debug('Finished getting specific record.')
        }));
  }

  /**
   * Get all of the records for the given entity.
   *
   * @returns {Observable<T[]>}
   */
  getAll(): Observable<T[]> {
    console.debug('Getting all records.');
    return this.httpClient.get(this.baseUrl + '/' + this.entityName, {headers: super.getAuthHeaders()})
      .pipe(map((data: any) => data.result),
        map((result: Array<T>) => {
          return result
        }), catchError((error: HttpErrorResponse) => {
          return Observable.throw(error.message)
        }), finalize(() => {
          console.debug('Finished getting all records.')
        }));
  }
}
