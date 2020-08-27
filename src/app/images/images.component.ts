import { Title } from '@angular/platform-browser';
import { ImagesService } from '../shared/images.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IImage } from '../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { timeout } from 'rxjs/operators';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  images3x3: IImage[];
  currentIndex = 0;
  limit = 15;
  showSpinner: boolean = true;
  title: string = 'Feed | Snapify';
  constructor(
    private imagesService: ImagesService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.imagesService
      .getImages(this.currentIndex, this.limit)
      .subscribe((data) => {
        this.images3x3 = data;
        this.showSpinner = false;
      });
  }

  onScroll() {
    this.showSpinner = true;
    this.currentIndex += 15;
    this.imagesService
      .getImages(this.currentIndex, this.limit)
      .subscribe((data) => {
        this.showSpinner = false;
        this.images3x3 = this.images3x3.concat(data);
      });
  }
}
