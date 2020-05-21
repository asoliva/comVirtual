import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userfilter'
})
export class UserfilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') { return value; }
    const resultUser = [];
    for (const user of value) {
      if (user.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultUser.push(user);
      } else if (user.apellidos.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultUser.push(user);
      }
    };
    return resultUser;
  }

}
