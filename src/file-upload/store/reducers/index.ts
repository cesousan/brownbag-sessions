import { ActionReducerMap } from '@ngrx/store';
import * as fromFileUpload from './upload-file.reducer';

export interface UploadState {
  files: fromFileUpload.FileUploadState;
}

export const reducers: ActionReducerMap<UploadState> = {
  files: fromFileUpload.reducer
};

export * from './upload-file.reducer';
