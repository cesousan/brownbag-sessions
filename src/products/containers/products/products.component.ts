import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Pizza } from '../../models/pizza.model';
import * as fromStore from '../../store';
import { map } from 'rxjs/operators';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['products.component.scss'],
  template: `
    <div class="products">
      <div class="products__new">
        <a
          class="btn btn__ok"
          routerLink="./new">
          New Pizza
        </a>
      </div>
      <div class="products__list">
        <ng-container *ngIf="(pizzas$ | async) as pizzas; else noPizza">
          <pizza-item
            *ngFor="let pizza of pizzas"
            [pizza]="pizza">
          </pizza-item>
        </ng-container>
        <ng-template #noPizza>
          No pizzas, add one to get started.
        </ng-template>
      </div>
    </div>
  `,
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
    // this.pizzas$ = this.store.select('pizzas').pipe(
    //   map(pizzaState => pizzaState.data)
    // );
  }
}
