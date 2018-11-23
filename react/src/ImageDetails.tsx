import React, { useContext } from 'react';
import { StoreContext } from 'src/StoreContext';
import { ActionType } from 'src/state';

export function ImageDetails(): JSX.Element {
  const { state, dispatch } = useContext(StoreContext);
  const image = state.activeImage != null ? state.images[state.activeImage] : null;

  return (
    <image-details>
      <div>
        {!image
          ? <h1>Please select an image</h1>
          : <div>
              <div className='image-container'>
                <img src={image.url}/>
              </div>
              <div className='comments-container'>
                <h4>Comments</h4>
                <div className="comment-list">
                  {image.comments.map(comment => (
                    <div>{ comment }</div>
                  ))}
                </div>
                <div>
                  <textarea
                    disabled={state.isSaving}
                    value={state.pendingComment}
                    onChange={(e: any) => dispatch({ type: ActionType.PENDING_COMMENT_CHANGED, payload: e.target.value })}>
                  </textarea>
                </div>
                <div>
                  <button onClick={() => dispatch({ type: ActionType.SAVE_COMMENT })} disabled={state.isSaving || !state.pendingComment}>
                    { state.isSaving ? 'Saving...' : 'Comment' }
                  </button>
                </div>
              </div>
            </div>
        }
      </div>
    </image-details>
  );
}