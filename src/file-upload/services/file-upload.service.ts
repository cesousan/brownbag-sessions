import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private API_UPLOAD_BASE_URL = environment.uploadUrl;

  constructor(
    private http: HttpClient
  ) { }

  public uploadFile(file: File): Observable<HttpEvent<{}>> {
    const formData = new FormData();
    formData.append('files', file, file.name);
    const options = {
      reportProgress: true
    };
    const req = new HttpRequest(
      'POST',
      `${this.API_UPLOAD_BASE_URL}/file`,
      formData,
      options
    );
    return this.http.request(req);
  }
}
