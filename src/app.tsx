/// <reference path="./index.d.ts" />

import { app, h } from 'hyperapp';

import { actions } from './actions';
import { ImageGallery } from './ImageGallery';
import { state } from './state';

export const view = () => (<ImageGallery></ImageGallery>);

app(state, actions, view, document.body);
