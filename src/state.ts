import image1 from './assets/image_1.jpg';
import image2 from './assets/image_2.jpg';
import image3 from './assets/image_3.jpg';
import image4 from './assets/image_4.jpg';
import image5 from './assets/image_5.jpg';
import image6 from './assets/image_6.jpg';
import image7 from './assets/image_7.jpg';
import image8 from './assets/image_8.jpg';

export interface State {
  activeImage: number | null;
  images: {
    url: string;
    comments: string[];
  }[],
  pendingComment: string;
  isSaving: boolean;
}

export const state: State = {
  activeImage: null,
  images: [
    { url: image1, comments: [] },
    { url: image2, comments: [] },
    { url: image3, comments: [] },
    { url: image4, comments: [] },
    { url: image5, comments: [] },
    { url: image6, comments: [] },
    { url: image7, comments: [] },
    { url: image8, comments: [] }
  ],
  pendingComment: '',
  isSaving: false
};