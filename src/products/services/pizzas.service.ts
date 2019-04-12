import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, take, scan } from 'rxjs/operators';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzasService {
  constructor(private http: HttpClient) {}
  private i = 0;
  getPizzas(): Observable<Pizza[]> {
    return this.http
      .get<Pizza[]>(`/api/pizzas`)
      .pipe(
        /**
         * fakes asynchronous update of the data from backend
         * to test polling and proper rerendering of the pizzas.
         */
        scan((x, y) => {
          return y.slice(0, this.i < y.length ? ++this.i : this.i);
        }, []),
        catchError((error: any) => throwError(error))
      );
  }

  createPizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .post<Pizza>(`/api/pizzas`, payload)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  updatePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .put<Pizza>(`/api/pizzas/${payload.id}`, payload)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  removePizza(payload: Pizza): Observable<Pizza> {
    return this.http
      .delete<any>(`/api/pizzas/${payload.id}`)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }
}
