import { SharedModule } from './../shared/shared.module';
import { AppRoutingModule } from './../app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images.component';
import { ImageComponent } from './image/image.component';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ImageAddComponent } from './image-add/image-add.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
@NgModule({
  declarations: [
    ImagesComponent,
    ImageComponent,
    ImageEditComponent,
    ImageAddComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
  ],
  exports: [ImagesComponent],
})
export class ImagesModule {}
