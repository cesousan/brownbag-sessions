import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// import * as fromComponents from './components';

// // containers
// import * as fromContainers from './containers';

// // guards
// import * as fromGuards from './guards';

// services
import * as fromServices from './services';

import * as fromStore from './store';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('uploads', fromStore.reducers),
    EffectsModule.forFeature(fromStore.effects)
  ],
  providers: [ ...fromServices.services ]
})
export class FileUploadModule { }
