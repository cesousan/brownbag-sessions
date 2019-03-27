import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable, combineLatest } from 'rxjs';

import { Pizza } from '../../models/pizza.model';
import { PizzasService } from '../../services/pizzas.service';
import { ToppingsService } from '../../services/toppings.service';

import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { ProductsState } from '../../store';
import * as fromStore from '../../store';
import * as fromAppStore from '../../../app/store';
import { map, filter, tap } from 'rxjs/operators';


@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  template: `
    <div
      class="product-item">
      <pizza-form
        [pizza]="pizza$ | async"
        [toppings]="toppings$ | async"
        (selected)="onSelect($event)"
        (create)="onCreate($event)"
        (update)="onUpdate($event)"
        (remove)="onRemove($event)">
        <pizza-display
          [pizza]="selected">
        </pizza-display>
      </pizza-form>
    </div>
  `,
})
export class ProductItemComponent implements OnInit {

  pizza$: Observable<Pizza>;
  selected: Pizza;
  toppings$: Observable<string[]>;

  constructor(
    private pizzaService: PizzasService,
    private router: Router,

    private routerStore$: Store<fromAppStore.RouterStateUrl>,
    private pizzaStore$: Store<fromStore.ProductsState>
  ) {}

  ngOnInit() {

    const param$: Observable<string> = this.routerStore$.select(fromAppStore.getParams).pipe(
      map(params => params.id)
    );
    const pizzas$: Observable<Pizza[]> = this.pizzaStore$.select(fromStore.getAllPizzas);

    this.pizza$ = combineLatest(
      param$,
      pizzas$
    ).pipe(
      map(([param, pizzas]) => param === 'new'
        ? {}
        : pizzas.find(pizza => pizza.id === parseInt(param, 10))
      ),
      tap(pizza => this.selected = pizza)
    );

    this.toppings$ = this.pizzaStore$.select(fromStore.getAllToppings);

    // this.pizzaService.getPizzas().subscribe(pizzas => {
    //   const param = this.route.snapshot.params.id;
    //   let pizza;
    //   if (param === 'new') {
    //     pizza = {};
    //   } else {
    //     pizza = pizzas.find(pizza => pizza.id == parseInt(param, 10));
    //   }
    //   this.pizza = pizza;
    //   this.selected = pizza;
    //   this.toppingsService.getToppings().subscribe(toppings => {
    //     this.toppings = toppings;
    //   });
    // });
  }

  onSelect(event: Pizza) {
    this.selected = event;
  }

  onCreate(event: Pizza) {
    this.pizzaService.createPizza(event).subscribe(pizza => {
      this.router.navigate([`/products/${pizza.id}`]);
    });
  }

  onUpdate(event: Pizza) {
    this.pizzaService.updatePizza(event).subscribe(() => {
      this.router.navigate([`/products`]);
    });
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.pizzaService.removePizza(event).subscribe(() => {
        this.router.navigate([`/products`]);
      });
    }
  }
}
