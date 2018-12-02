import { NgModule, ModuleWithProviders, Inject } from '@angular/core';

import { Store, REDUCERS, StateReducers, INITIAL_STATE, Actions, ActionsSource } from './Store';

@NgModule({})
export class StateModule {
  constructor(
    @Inject(Store) store: Store<any>
  ) {}

  static forRoot<S>(reducers: StateReducers<S>, initialState: S): ModuleWithProviders {
    return {
      ngModule: StateModule,
      providers: [
        Store,
        { provide: Actions, useFactory: () => new Actions() },
        { provide: ActionsSource, useFactory: () => new ActionsSource() },
        { provide: REDUCERS, useValue: reducers },
        { provide: INITIAL_STATE, useValue: initialState }
      ]
    };
  }
}
