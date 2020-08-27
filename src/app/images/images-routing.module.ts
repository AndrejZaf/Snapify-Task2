import { PageNotFoundComponent } from './../pagenotfound/pagenotfound.component';
import { ImageServiceResolver } from './../shared/image.resolver.service';
import { ImageEditComponent } from './image-edit/image-edit.component';
import { ImageAddComponent } from './image-add/image-add.component';
import { AuthGuard } from './../shared/auth.guard';
import { ImageComponent } from './image/image.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImagesComponent } from './images.component';

const routes: Routes = [
  { path: '', component: ImagesComponent },
  {
    path: 'add',
    component: ImageAddComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:id',
    component: ImageEditComponent,
    canActivate: [AuthGuard],
    resolve: { data: ImageServiceResolver },
  },
  {
    path: ':id',
    component: ImageComponent,
    resolve: { data: ImageServiceResolver },
  },
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImagesRoutingModule {}
