import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';

const data = {
  toppings: [
    'anchovy',
    'bacon',
    'basil',
    'chili',
    'mozzarella',
    'mushroom',
    'olive',
    'onion',
    'pepper',
    'pepperoni',
    'sweetcorn',
    'tomato'
  ],
  pizzas: [
    {
      name: 'The Inferno',
      toppings: ['pepper', 'mozzarella', 'mushroom', 'bacon', 'basil'],
      id: 1,
      sizes: []
    },
    {
      name: 'Seaside Surfin\'',
      toppings: [
        'mozzarella',
        'mushroom',
        'anchovy',
        'pepper',
        'olive',
        'onion',
        'sweetcorn',
        'tomato'
      ],
      id: 2
    },
    {
      name: 'Peperonni',
      toppings: [
        'tomato',
        'olive',
        'mushroom',
        'pepperoni',
        'pepper',
        'mozzarella',
        'basil'
      ],
      sizes: [],
      id: 5
    }
  ]
};

@Injectable({
  providedIn: 'root'
})
export class PizzaInMemoryDataService implements InMemoryDbService {

  createDb() {
    const {
      pizzas,
      toppings
    } = data;
    return {
      pizzas,
      toppings
    };
  }

}
