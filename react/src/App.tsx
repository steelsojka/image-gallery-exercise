import React, { ReactNode, useReducer } from 'react';

import { ImageGallery } from './ImageGallery';
import { appReducer, initialState } from './state';

export function App() {
  const [ state, dispatch ] = useReducer(appReducer, initialState);

  return <ImageGallery state={state} dispatch={dispatch} />;
}