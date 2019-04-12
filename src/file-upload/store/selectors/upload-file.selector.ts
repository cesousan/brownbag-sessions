import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import * as fromReducer from '../reducers';

export const selectUploadFeatureState: MemoizedSelector<
  object,
  fromReducer.UploadState
> = createFeatureSelector<fromReducer.UploadState>('upload');

export const selectUploadFileState = createSelector(
  selectUploadFeatureState,
  (state: fromReducer.UploadState) => state.files
);

export const selectUploadFileError = createSelector(
  selectUploadFileState,
  fromReducer.getError
);

export const selectUploadFileReady = createSelector(
  selectUploadFileState,
  fromReducer.getReady
);

export const selectUploadFileRequested = createSelector(
  selectUploadFileState,
  fromReducer.getRequested
);

export const selectUploadFileStarted = createSelector(
  selectUploadFileState,
  fromReducer.getStarted
);

export const selectUploadFileProgress = createSelector(
  selectUploadFileState,
  fromReducer.getProgress
);

export const selectUploadFileInProgress = createSelector(
  selectUploadFileState,
  fromReducer.getInProgress
);

export const selectUploadFileFailed = createSelector(
  selectUploadFileState,
  fromReducer.getFailed
);

export const selectUploadFileCompleted = createSelector(
  selectUploadFileState,
  fromReducer.getCompleted
);
