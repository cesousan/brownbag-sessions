import { TestBed } from '@angular/core/testing';

import { UploadFileEffect } from './upload-file.effect';

describe('UploadFileEffect', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UploadFileEffect = TestBed.get(UploadFileEffect);
    expect(service).toBeTruthy();
  });
});
