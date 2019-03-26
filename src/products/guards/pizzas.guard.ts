import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable, of } from 'rxjs';


import * as fromStore from '../store';

@Injectable()
export class PizzasGuard implements CanActivate {
  constructor(private store: Store<fromStore.ProductsState>) {}

  canActivate(): Observable<boolean> {
    console.log('hey');
    return of(true);
  }
}
