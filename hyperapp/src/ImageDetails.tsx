import { h } from 'hyperapp';
import { State } from './state';
import { actions as Actions } from './actions';

export const ImageDetails = () => (state: State, actions: typeof Actions) => {
  const image = state.activeImage != null ? state.images[state.activeImage] : null;

  return (
  <image-details>
    <div>
      {!image
        ? <h1>Please select an image</h1>
        : <div>
            <div class='image-container'>
              <img src={image.url}/>
            </div>
            <div class='comments-container'>
              <h4>Comments</h4>
              <div class="comment-list">
                {image.comments.map(comment => (
                  <div>{ comment }</div>
                ))}
              </div>
              <div>
                <textarea
                  disabled={state.isSaving}
                  value={state.pendingComment}
                  oninput={(e: any) => actions.pendingCommentChanged(e.target.value)}>
                </textarea>
              </div>
              <div>
                <button onclick={() => actions.saveComment()} disabled={state.isSaving || !state.pendingComment}>
                  { state.isSaving ? 'Saving...' : 'Comment' }
                </button>
              </div>
            </div>
          </div>
      }
    </div>
  </image-details>
)};