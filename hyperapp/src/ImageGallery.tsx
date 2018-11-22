import { h } from 'hyperapp';
import { State } from './state';
import { ImageSelector } from './ImageSelector';
import { ImageDetails } from './ImageDetails';

export const ImageGallery = () => (state: State) => (
  <image-gallery class='column'>
    <div>
      <ImageSelector></ImageSelector>
      <ImageDetails></ImageDetails>
    </div>
  </image-gallery>
)