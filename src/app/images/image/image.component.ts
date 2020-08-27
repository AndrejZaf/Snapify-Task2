import { timeout } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { ImageResolver } from './../../shared/interfaces';
import { ImageServiceResolver } from './../../shared/image.resolver.service';
import { ImagesService } from '../../shared/images.service';
import { IImage } from '../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
})
export class ImageComponent implements OnInit {
  image: IImage;
  title: string;
  showSpinner: boolean = true;
  errorMessage: string;
  constructor(
    private route: ActivatedRoute,
    private imageService: ImagesService,
    private router: Router,
    private authService: AuthService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      const imageResolver: ImageResolver = data['data'];
      this.errorMessage = imageResolver.error;
      this.showSpinner = false;
      this.onImageRetrieved(imageResolver.image);
    });
  }

  deleteProduct(): void {
    if (confirm(`Really delete the image: ${this.image.title}?`)) {
      this.imageService.deleteImage(this.image.id).subscribe({
        next: () => this.onSaveComplete(),
      });
    }
  }

  onSaveComplete() {
    this.router.navigate(['/images']);
  }

  displayEditDelete(): boolean {
    if (this.authService.currentUser?.role === 'admin') {
      return true;
    } else if (
      this.authService.currentUser?.role === 'user' &&
      this.image.userId === this.authService.currentUser.id
    ) {
      return true;
    }
    return false;
  }

  onImageRetrieved(image: IImage): void {
    if (image) {
      this.image = image;
      this.title = `${image.title} | Snapify`;
    } else {
      this.router.navigate(['/404']);
    }
  }
}
