import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, HostListener } from '@angular/core';

import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Pizza } from '../../models/pizza.model';
import * as fromStore from '../../store';
import { pollMachine, PollingMachine } from 'src/app/utils/action-poll';

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
            *ngFor="let pizza of pizzas; let index = i; trackBy:trackByPizzaId"
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
export class ProductsComponent implements OnInit, OnDestroy {
  pizzas$: Observable<Pizza[]>;
  private poll: PollingMachine;
  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select(fromStore.getAllPizzas);
    this.poll = pollMachine(fromStore.LoadPizza, this.store, 5);
    this.poll.start();
  }

  @HostListener('window:beforeunload')
  ngOnDestroy(): void {
    this.poll.stop();
  }

  trackByPizzaId(index: number, item: Pizza) {
    return !item
      ? null
      : !item.id
        ? index
        : item.id;
  }
}
