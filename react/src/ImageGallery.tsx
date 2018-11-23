import React from 'react';

import { AppState, Action } from './state';

export function ImageGallery(props: { state: AppState, dispatch: React.Dispatch<Action> }): JSX.Element {
  return (
    <image-gallery className='column'>
      <div>
        <ImageSelector state={props.state} dispatch={props.dispatch}></ImageSelector>
        <ImageDetails state={props.state} dispatch={props.dispatch}></ImageDetails>
      </div>
    </image-gallery>
  );
}