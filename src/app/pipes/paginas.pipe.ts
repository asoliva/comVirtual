import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'paginas'
})
export class PaginasPipe implements PipeTransform {


  // tslint:disable-next-line:variable-name
  transform(array: any[], page_size: number | string, page_number: number): any[] {


    page_size = page_size || 5;
    page_number = page_number || 1;
    --page_number;

    // @ts-ignore
    return array.slice(page_number * page_size, (page_number + 1) * page_size );
  }

}
