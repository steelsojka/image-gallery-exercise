import image1 from 'src/assets/image_1.jpg';
import image2 from 'src/assets/image_2.jpg';
import image3 from 'src/assets/image_3.jpg';
import image4 from 'src/assets/image_4.jpg';
import image5 from 'src/assets/image_5.jpg';
import image6 from 'src/assets/image_6.jpg';
import image7 from 'src/assets/image_7.jpg';
import image8 from 'src/assets/image_8.jpg';

export interface AppState {
  activeImage: number | null;
  images: {
    url: string;
    comments: string[];
  }[];
  pendingComment: string;
  isSaving: boolean;
}

export interface Action {
  payload?: any;
  type: string;
}

function combineReducers<S>(
  stateReducers: { [K in keyof S]: (state: S[K], action: Action) => S[K] }
): (state: S, action: Action ) => S {
  return (state: S, action: Action) => {
    const result: S = {} as any;
    let hasChanged = false;

    for (const key of Object.keys(state)) {
      const keyResult = stateReducers[key as keyof S]!(state[key as keyof S], action);

      if (keyResult !== state[key as keyof S]) {
        hasChanged = true;
      }

      result[key as keyof S] = keyResult;
    }

    return hasChanged ? result : state;
  };
}

export const initialState: AppState = {
  activeImage: null,
  images: [
    { url: image1, comments: [] },
    { url: image2, comments: [] },
    { url: image3, comments: [] },
    { url: image4, comments: [] },
    { url: image5, comments: [] },
    { url: image6, comments: [] },
    { url: image7, comments: [] },
    { url: image8, comments: [] }
  ],
  pendingComment: '',
  isSaving: false
};

export enum ActionType {
  SELECTED_IMAGE_CHANGED = 'SELECTED_IMAGE_CHANGED',
  PENDING_COMMENT_CHANGED = 'PENDING_COMMENT_CHANGED',
  SAVE_COMMENT = 'SAVE_COMMENT',
  COMMENT_SAVED = 'COMMENT_SAVED'
}

export const appReducer = combineReducers<AppState>({
  activeImage(state: AppState['activeImage'], action: Action): AppState['activeImage'] {
    switch (action.type) {
      case ActionType.SELECTED_IMAGE_CHANGED:
        return action.payload;
      default:
        return state;
    }
  },
  images(state: AppState['images'], action: Action): AppState['images'] {
    switch (action.type) {
      case ActionType.COMMENT_SAVED: {
        const { index, comment } = action.payload;

        return [
          ...state.slice(0, index),
          {
            ...state[index],
            comments: [
              ...state[index].comments,
              comment
            ]
          },
          ...state.slice(index + 1)
        ];
      }
      default:
        return state;
    }
  },
  pendingComment(state: AppState['pendingComment'], action: Action): AppState['pendingComment'] {
    switch (action.type) {
      case ActionType.COMMENT_SAVED:
        return '';
      case ActionType.PENDING_COMMENT_CHANGED:
        return action.payload;
      default:
        return state;
    }
  },
  isSaving(state: AppState['isSaving'], action: Action): AppState['isSaving'] {
    switch (action.type) {
      case ActionType.COMMENT_SAVED:
        return false;
      case ActionType.SAVE_COMMENT:
        return true;
      default:
        return state;
    }
  }
});
