import { h } from 'hyperapp';
import { State } from './state';
import { actions as Actions } from './actions';

export const ImageSelector = () => (state: State, actions: typeof Actions) => (
  <image-selector>
    {state.images.map((image, index) => (
      <div
        class={`image-thumbnail ${state.activeImage === index ? 'active' : ''}`.trim()}>
        <img src={image.url} onclick={() => actions.updateActiveImage(index)}/>
      </div>
    ))}
  </image-selector>
)