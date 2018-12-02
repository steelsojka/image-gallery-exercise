import { BehaviorSubject, Subject, Observable } from 'rxjs';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { Inject, InjectionToken, Injectable } from '@angular/core';

export interface Action<T = any> {
  type: string;
  payload: T;
}

export type StateReducers<S> = { [K in keyof S]: (state: S[K], action: Action) => S[K] };

export const REDUCERS = new InjectionToken<any>('REDUCERS');
export const INITIAL_STATE = new InjectionToken<any>('INITIAL_STATE');

export function combineReducers<S>(reducers: StateReducers<S>): (state: S, action: Action) => S {
  return (state: S, action: Action): S => {
    const newState = {};
    let hasChanged = false;

    for (const key of Object.keys(reducers)) {
      newState[key] = reducers[key](state[key], action);

      if (newState[key] !== state[key]) {
        hasChanged = true;
      }
    }

    return hasChanged ? newState as S : state;
  };
}

@Injectable()
export class Actions extends Subject<Action> {}

@Injectable()
export class Store<S> extends BehaviorSubject<S> {
  private reducer: (state: S, action: Action) => S = combineReducers(this.reducers);

  constructor(
    @Inject(REDUCERS) private reducers: StateReducers<S>,
    @Inject(Actions) private actions: Actions,
    @Inject(INITIAL_STATE) initialState: S
  ) {
    super(initialState);

    this.actions.asObservable()
      .pipe(
        map(action => this.reducer(this.getValue(), action)),
        filter(newState => newState !== this.getValue()))
      .subscribe(newState => this.next(newState));
  }

  dispatch<T>(action: Action<T>): void {
    this.actions.next(action);
  }

  select<K extends keyof S, V>(key: K): Observable<S[K]> {
    return this.pipe(
      map(state => state[key]),
      distinctUntilChanged());
  }
}
