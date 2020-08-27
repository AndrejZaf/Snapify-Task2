import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customTitle',
})
export class TitlePipe implements PipeTransform {
  transform(value: string, ...args: any[]): string {
    const limit = 10;
    return value.substring(0, limit) + '...';
  }
}
