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
      switchMap(() => {
        const storedCounter = localStorage.getItem('count');
        if (storedCounter) {
          return of(set({ value: +storedCounter }));
        }
        return of(set({ value: 0 }));
      })
    )
  );

  saveCount = createEffect(
    () =>
      this.actions$.pipe(
        ofType(increment, decrement),
        withLatestFrom(this.store.select(selectCount)),
        tap(([action, counter]) => {
          localStorage.setItem('count', counter.toString());
        })
      ),
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<{ counter: number }>
  ) {}
}
