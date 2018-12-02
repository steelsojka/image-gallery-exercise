import { Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, combineLatest } from 'rxjs/operators';

import { Store } from '../state/Store';
import { AppState, Image } from '../app.state';
import { AppActions } from '../app-actions.service';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.css']
})
export class ImageSelectorComponent {
  readonly activeImage$: Observable<Image | null> = this.store.select('activeImage');

  readonly images$: Observable<(Image & { isActive: boolean })[]> = this.store.select('images')
    .pipe(
      combineLatest(this.activeImage$),
      map(([ images, activeImage ]) => images.map(image => ({
        ...image,
        isActive: Boolean(activeImage && activeImage.url === image.url)
      }))));

  constructor(
    @Inject(Store) private store: Store<AppState>,
    @Inject(AppActions) private actions: AppActions
  ) {}

  onImageClick(image: Image): void {
    this.actions.setActiveImage(image);
  }
}
