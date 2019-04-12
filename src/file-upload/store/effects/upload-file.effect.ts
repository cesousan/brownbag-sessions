import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { concatMap, takeUntil, map, catchError } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { HttpEvent, HttpEventType } from '@angular/common/http';

import { FileUploadService } from '../../services/file-upload.service';
import * as fromFileUpload from '../actions';

@Injectable({
  providedIn: 'root'
})
export class UploadFileEffect {

  constructor(
    private actions$: Actions<fromFileUpload.UploadActions>,
    private uploadService: FileUploadService
  ) { }

  @Effect()
  uploadRequestEffect$: Observable<Action> = this.actions$.pipe(
    ofType(fromFileUpload.UPLOAD_REQUEST),
    concatMap(
      ({ payload }) => this.uploadService.uploadFile(payload.file).pipe(
        takeUntil(
          this.actions$.pipe(
            ofType(fromFileUpload.UPLOAD_CANCEL)
          )
        ),
        map(getActionFromHttpEvent),
        catchError(error => of(error))
      )
    )
  )
}

function getActionFromHttpEvent(event: HttpEvent<any>) {
  switch(event.type) {
    case HttpEventType.Sent: {
      return new fromFileUpload.UploadStarted();
    }
    case HttpEventType.UploadProgress: {
      return new fromFileUpload.UploadProgress({
        progress: Math.round((100 * event.loaded) / event.total)
      });
    }
    case HttpEventType.ResponseHeader:
    case HttpEventType.Response: {
      return event.status === 200
        ? new fromFileUpload.UploadCompleted()
        : new fromFileUpload.UploadFailure({
          error: event.statusText
        });
    }
    default: {
      return new fromFileUpload.UploadFailure({
        error: `Unknown Event : ${JSON.stringify(event)}`
      });
    }
  }

  return;
}
