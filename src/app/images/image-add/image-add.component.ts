import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IImage } from 'src/app/shared/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ImagesService } from 'src/app/shared/images.service';

@Component({
  selector: 'app-image-add',
  templateUrl: './image-add.component.html',
  styleUrls: ['./image-add.component.css'],
})
export class ImageAddComponent implements OnInit {
  image: IImage;
  imageForm: FormGroup;
  title: string = 'Add Image | Snapify';
  showSpinner: boolean = true;
  constructor(
    private fb: FormBuilder,
    private imagesService: ImagesService,
    private router: Router,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.imageForm = this.fb.group({
      albumId: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      title: ['', [Validators.required, Validators.maxLength(50)]],
      url: ['', [Validators.required]],
      thumbnailUrl: ['', [Validators.required]],
    });
    this.showSpinner = false;
  }

  save(): void {
    this.showSpinner = true;
    if (!this.imageForm.valid) {
      this.imageForm.markAllAsTouched();
      this.showSpinner = false;
      return;
    }
    const i = { ...this.image, ...this.imageForm.value };
    this.imagesService.createImage(i).subscribe({
      next: () => this.onSaveComplete(),
    });
  }
  onSaveComplete(): void {
    this.showSpinner = false;
    this.imageForm.reset();
    this.router.navigate([`/images`]);
  }
}
