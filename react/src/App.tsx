import React, { useReducer, useEffect } from 'react';
import { ImageGallery } from 'src/ImageGallery';
import { appReducer, initialState, ActionType } from 'src/state';
import { StoreContext } from 'src/StoreContext';

export function App(): JSX.Element {
  const [ state, dispatch ] = useReducer(appReducer, initialState);
  const store = { state, dispatch };

  // Save the comment.
  useEffect(() => {
    if (!state.isSaving) {
      return;
    }

    const id = setTimeout(() =>
      dispatch({
        type: ActionType.COMMENT_SAVED,
        payload: { index: state.activeImage, comment: state.pendingComment }
      }), Math.random() * 2 * 1000);

    return () => clearTimeout(id);
  }, [ state.isSaving ]);

  return (
    <StoreContext.Provider value={store}>
      <ImageGallery/>
    </StoreContext.Provider>
  );
}