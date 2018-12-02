import { Injectable, Inject } from '@angular/core';
import { Store, Action } from './state/Store';
import { AppState, Image } from './app.state';

export enum ActionType {
  ACTIVE_IMAGE_CHANGED = 'ACTIVE_IMAGE_CHANGED'
}

export type ActiveImageChangedAction = Action<Image>;

export type AllActions =
  ActiveImageChangedAction;

@Injectable({ providedIn: 'root' })
export class AppActions {
  constructor(
    @Inject(Store) private store: Store<AppState>
  ) {}

  setActiveImage(activeImage: Image): void {
    this.store.dispatch({ type: ActionType.ACTIVE_IMAGE_CHANGED, payload: activeImage } as ActiveImageChangedAction);
  }
}
