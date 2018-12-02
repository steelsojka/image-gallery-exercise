import { StateReducers, Action } from './state/Store';
import { ActionType, AllActions } from './app-actions.service';

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
  images: [
    { url: 'assets/image_1.jpg', comments: [] },
    { url: 'assets/image_2.jpg', comments: [] },
    { url: 'assets/image_3.jpg', comments: [] },
    { url: 'assets/image_4.jpg', comments: [] },
    { url: 'assets/image_5.jpg', comments: [] },
    { url: 'assets/image_6.jpg', comments: [] },
    { url: 'assets/image_7.jpg', comments: [] },
    { url: 'assets/image_8.jpg', comments: [] }
  ]
};

export const reducers: StateReducers<AppState> = {
  activeImage(state: AppState['activeImage'], action: AllActions): AppState['activeImage'] {
    switch (action.type) {
      case ActionType.ACTIVE_IMAGE_CHANGED:
        return action.payload;
      default:
        return state;
    }
  },
  images(state: AppState['images'], action: AllActions): AppState['images'] {
    switch (action.type) {
      default:
        return state;
    }
  }
};
