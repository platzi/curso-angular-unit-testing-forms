import { AbstractControl } from '@angular/forms';
import { UsersService } from './../services/user.service';

import { map } from 'rxjs/operators';

export class MyValidators {

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    console.log(value);
    if (value > 10000) {
      return {price_invalid: true};
    }
    return null;
  }

  static validPassword(control: AbstractControl) {
    const value = control.value;
    if (!containsNumber(value)) {
      return {invalid_password: true};
    }
    return null; // null === todo bien
  }

  static matchPasswords(control: AbstractControl) {
    const password = control?.get('password')?.value;
    const confirmPassword = control?.get('confirmPassword')?.value;
    if (password === undefined || confirmPassword === undefined) {
      throw new Error('matchPasswords: fields not found');
    }
    if (password !== confirmPassword) {
      return {match_password: true};
    }
    return null; // null === todo bien
  }

  // static validateCategory(service: CategoriesService) {
  //   return (control: AbstractControl) => {
  //     const value = control.value;
  //     return service.checkCategory(value)
  //     .pipe(
  //       map((response: any) => {
  //         const isAvailable = response.isAvailable;
  //         if (!isAvailable) {
  //           return {not_available: true};
  //         }
  //         return null;
  //       })
  //     );
  //   };
  // }

  static validateEmailAsync(service: UsersService) {
    return (control: AbstractControl) => {
      const value = control.value;
      return service.isAvailableByEmail(value)
      .pipe(
        map((response) => {
          const isAvailable = response.isAvailable;
          if (!isAvailable) {
            return {not_available: true};
          }
          return null;
        })
      );
    };
  }

}

function containsNumber(value: string){
  return value.split('').find(v => isNumber(v)) !== undefined;
}


function isNumber(value: string){
  return !isNaN(parseInt(value, 10));
}
