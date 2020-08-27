import { ImagesService } from './../../shared/images.service';
import { IImage, ImageResolver } from './../../shared/interfaces';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { TitleCasePipe } from '@angular/common';
@Component({
  selector: 'app-image-edit',
  templateUrl: './image-edit.component.html',
  styleUrls: ['./image-edit.component.css'],
})
export class ImageEditComponent implements OnInit {
  image: IImage;
  imageForm: FormGroup;
  title: string = 'Edit Image | Snapify';
  showSpinner: boolean = false;
  constructor(
    private fb: FormBuilder,
    private imagesService: ImagesService,
    private route: ActivatedRoute,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      albumId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      url: ['', [Validators.required]],
      thumbnailUrl: ['', [Validators.required]],
    });

    this.route.data.subscribe((data) => {
      const imageResolver: ImageResolver = data['data'];
      this.image = imageResolver.image;
      this.showSpinner = false;
      this.onImageRetrieved(this.image);
    });
  }

  onImageRetrieved(image: IImage) {
    this.image = image;
    this.displayImage(image);
    if (this.image) {
      this.titleService.setTitle(this.title);
    } else {
      this.router.navigate(['/404']);
    }
  }

  displayImage(img: IImage): void {
    this.image = img;
    this.imageForm.patchValue({
      title: this.image.title,
      url: this.image.url,
      thumbnailUrl: this.image.thumbnailUrl,
      albumId: this.image.albumId,
    });
  }

  save(): void {
    this.showSpinner = true;
    if (!this.imageForm.valid) {
      this.imageForm.markAllAsTouched();
      this.showSpinner = false;
      return;
    }
    const i = { ...this.image, ...this.imageForm.value };
    this.imagesService.updateImage(i).subscribe({
      next: () => this.onSaveComplete(),
    });
  }

  onSaveComplete(): void {
    this.showSpinner = false;
    this.imageForm.reset();
    this.router.navigate([`/images/${this.image.id}`]);
  }
}
