import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { StateModule } from './state/state.module';
import { reducers, initialState } from './app.state';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StateModule.forRoot(reducers, initialState)
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
