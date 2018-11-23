import React from 'react';
import { ImageSelector } from 'src/ImageSelector';
import { ImageDetails } from 'src/ImageDetails';

export function ImageGallery(): JSX.Element {
  return (
    <image-gallery className='column'>
      <div>
        <ImageSelector />
        <ImageDetails />
      </div>
    </image-gallery>
  );
}