import React, { useContext } from 'react';
import { ActionType } from 'src/state';
import { StoreContext } from 'src/StoreContext';

export function ImageSelector(): JSX.Element {
  const { state, dispatch } = useContext(StoreContext);

  return (
    <image-selector>
      {state.images.map((image, index) => (
        <div
          key={index}
          className={`image-thumbnail ${state.activeImage === index ? 'active' : ''}`.trim()}>
          <img src={image.url} onClick={() => dispatch({ type: ActionType.SELECTED_IMAGE_CHANGED, payload: index })} />
        </div>
      ))}
    </image-selector>
  );
}