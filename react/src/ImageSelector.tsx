import React from 'react';

import { AppState, Action, ActionType } from './state';

export function ImageSelector(props: { state: AppState, dispatch: React.Dispatch<Action> }): JSX.Element {
  return (
    <image-selector>
      {props.state.images.map((image, index) => (
        <div
          className={`image-thumbnail ${props.state.activeImage === index ? 'active' : ''}`.trim()}>
          <img src={image.url} onClick={() => props.dispatch({ type: ActionType.SELECTED_IMAGE_CHANGED, payload: index })} />
        </div>
      ))}
    </image-selector>
  );
}