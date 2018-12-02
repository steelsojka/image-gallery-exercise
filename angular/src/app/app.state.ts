import { StateReducers, Action } from './state/Store';

export interface Image {
  url: string;
  comments: string[];
}

export interface AppState {
  activeImage: Image | null;
  images: Image[];
}

export const initialState: AppState = {
  activeImage: null,
  images: []
};

export enum ActionType {
  ACTIVE_IMAGE_CHANGED = 'ACTIVE_IMAGE_CHANGED'
}

export const reducers: StateReducers<AppState> = {
  activeImage(state: AppState['activeImage'], action: Action): AppState['activeImage'] {
    switch (action.type) {
      case ActionType.ACTIVE_IMAGE_CHANGED:
        return action.payload;
      default:
        return state;
    }
  },
  images(state: AppState['images'], action: Action): AppState['images'] {
    switch (action.type) {
      default:
        return state;
    }
  }
};
