import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { decrement, increment, init, set } from './counter.actions';
import { tap, withLatestFrom, switchMap, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.selectors';

@Injectable()
export class CounterEffects {
  loadCount = createEffect(() =>
    this.actions$.pipe(
      ofType(init),
      switchMap(() => { //switchMap() returns a new Observable
        const storedCounter = localStorage.getItem('count');
        if (storedCounter) {
          return of(set({ value: +storedCounter })); //of() will transform the set action into an Observable
        }
        return of(set({ value: 0 }));
      })
    )
  );

  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)), //withLatestFrom will return an array of data, and in the tap() let's use the action and the data that was merged into this array = counter
        tap(([action, counter]) => {
          localStorage.setItem('count', counter.toString());
        })
      ),
    { dispatch: false } //use this second arg to NOT dispatch another action when this effect ends.
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}
}
