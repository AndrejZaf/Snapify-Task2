import { catchError, map } from 'rxjs/operators';
import { ImagesService } from './images.service';
import { ImageResolver } from './interfaces';
import { Injectable } from '@angular/core';
import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { of, Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class ImageServiceResolver implements Resolve<ImageResolver> {
  constructor(private imagesService: ImagesService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ImageResolver> {
    const id = route.paramMap.get('id');
    if (isNaN(+id)) {
      const message = `Image id was not found: ${id}`;
      console.error(message);
      return of({ image: null, error: message });
    }
    return this.imagesService.getImageById(+id).pipe(
      map((image) => ({ image })),
      catchError((error) => {
        const message = `Retrieval error: ${error}`;
        console.error(message);
        return of({ image: null, error: message });
      })
    );
  }
}
