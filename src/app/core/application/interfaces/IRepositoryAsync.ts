import { Observable } from "rxjs";

export interface IRepositoryAsync<T> {
  getAll(): Observable<T[]>;
  getById(id: string): Observable<T | null>;
  getPaginated(page: number, pageSize: number): Observable<T[] | null>;
}
