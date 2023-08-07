import { Component } from '@angular/core';

import { Store } from '@ngrx/store';
import { decrement, increment } from '../store/counter.actions';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrls: ['./counter-controls.component.css'],
})
export class CounterControlsComponent {
  constructor(private store: Store) {}

  //OLD DISPATCH APPROACH USED WITH OLD ACTION
  // increment() {
  //   this.store.dispatch(new IncrementAction(2));
  // }

  increment() {
    this.store.dispatch(increment({ value: 2 }));
  }

  decrement() {
    this.store.dispatch(decrement({value: 2}));
  }
}