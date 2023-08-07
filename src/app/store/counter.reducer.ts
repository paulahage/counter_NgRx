import { createReducer, on } from '@ngrx/store';
import { decrement, increment, init, set } from './counter.actions';

//OLD APPROACH TO CREATE REDUCER
// const initialState = 0;

// export function counterReducer(state = initialState, action: CounterActions | Action) {
//   if (action.type === INCREMENT) {
//     return state + (action as IncrementAction).value;
//   }
//   return state;
// }


//NEW APPROACH TO CREATE REDUCER
const initialState = 0;

export const counterReducer = createReducer(
  initialState,
  on(increment, (state, action) => state + action.value),
  on(decrement, (state, action) => state - action.value),
  on(set, (state,action)=> action.value),
);
