import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IImage } from './interfaces';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  apiUrl = 'http://localhost:3000/photos';
  // apiUrl = 'http://jsonplaceholder.typicode.com/photos';
  constructor(private http: HttpClient, private authService: AuthService) {}

  getImages(start?: number, limit?: number): Observable<IImage[]> {
    //?_sort=id&_order=desc -> Sort by id and get them in descending order
    //?_start=1&_limit=10 -> Get 10 elements each call we make, instead of making 5000 at first
    return this.http.get<IImage[]>(
      `${this.apiUrl}?_sort=id&_order=desc&_start=${start}&_limit=${limit}`
    );
  }

  getImageById(id: number): Observable<IImage> {
    return this.http.get<IImage>(`${this.apiUrl}/${id}`);
  }

  deleteImage(id: number) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.apiUrl}/${id}`;
    return this.http
      .delete<IImage>(url, { headers })
      .pipe(
        tap((data) => console.log('deleteImage: ' + id)),
        catchError(this.handleError)
      );
  }

  updateImage(image: IImage): Observable<IImage> {
    const headers = new HttpHeaders({ 'Content-Types': 'application/json' });
    const url = `${this.apiUrl}/${image.id}`;

    return this.http
      .put<IImage>(url, image, { headers })
      .pipe(
        tap(() => console.log('updateImage:', image.id)),
        map(() => image),
        catchError(this.handleError)
      );
  }

  createImage(image: IImage): Observable<IImage> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    image.id = null;
    image.userId = this.authService.currentUser.id;
    return this.http
      .post<IImage>(this.apiUrl, image, { headers })
      .pipe(
        tap((data) => console.log('createImage: ' + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  handleError(err): Observable<never> {
    let errorMessage: string;
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Backend returned code ${err.status}: ${err.body.error}`;
    }
    console.error(err);
    return throwError(errorMessage);
  }
}
