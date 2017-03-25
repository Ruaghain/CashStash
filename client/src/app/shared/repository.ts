import { Observable } from "rxjs";

export interface RepositoryInterface<T> {
  getEntities(): Observable<T>;
  getEntity(id: string): Observable<T>;
  saveEntity(entity: T): Observable<T>;
  updateEntity(entity: T): Observable<T>
}
