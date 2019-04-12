import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { UploadStatus } from 'src/file-upload/models';
import { fromReducer } from '../reducers';

export const selectUploadFileFeatureState: MemoizedSelector<
  object,
  fromReducer.FileUploadState
> = createFeatureSelector<fromReducer.FileUploadState>('uploadFile');

export const selectUploadFileError = createSelector(
  selectUploadFileFeatureState,
  fromReducer.getError
);

export const selectUploadFileReady = createSelector(
  selectUploadFileFeatureState,
  fromReducer.getReady
);

export const selectUploadFileRequested = createSelector(
  selectUploadFileFeatureState,
  fromReducer.getRequested
);

export const selectUploadFileStarted = createSelector(
  selectUploadFileFeatureState,
  fromReducer.getStarted
);

export const selectUploadFileProgress = createSelector(
  selectUploadFileFeatureState,
  fromReducer.getProgress
);

export const selectUploadFileInProgress = createSelector(
  selectUploadFileFeatureState,
  fromReducer.getInProgress
);

export const selectUploadFileFailed = createSelector(
  selectUploadFileFeatureState,
  fromReducer.getFailed
);

export const selectUploadFileCompleted = createSelector(
  selectUploadFileFeatureState,
  fromReducer.getCompleted
);
