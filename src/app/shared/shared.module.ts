import { CacheInterceptor } from './cache.interceptor';
import { TitlePipe } from './title.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [TitlePipe, LoadingSpinnerComponent],
  imports: [CommonModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
  exports: [TitlePipe, LoadingSpinnerComponent],
})
export class SharedModule {}
