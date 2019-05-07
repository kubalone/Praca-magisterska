import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

 
  //sprawdzanie czy pole jest wymagane
  checkRequired(field: AbstractControl) {
   return  this.required(field) && this.touched(field);
  }

  //sprawdzanie minimalnej liczby znaków
  checkMinLength(field: AbstractControl) {
    return  this.minLength(field) && this.touched(field);
  }

  //sprawdzanie czy w formularzu wystąpiły błędy
  checkErrorDataEntry(field: AbstractControl) {
    return this.checkRequired(field) || this.checkMinLength(field);
  }

  //sprawdzanie czy wpisane dane są poprawne
  checkCorrectDataEntry(field: AbstractControl) {
    return this.dirty(field) && !this.required(field) && !this.minLength(field);
  }

  //sprawdzanie czy w formularzu (potwierdznie hasła)wystąpiły błędy
  checkErrorDataEntryInConfirmationPassword(pass: AbstractControl, confPass: AbstractControl ) {
    return  this.checkRequired(pass) || this.passwordMismatch(pass)  ;
    

  }
  //sprawdzanie czy wpisane dane (potwierdznie hasła) są poprawne
  checkCorrectDataEntryInConfirmationPassword(field: AbstractControl) {
     return this.dirty(field)   && !this.required(field) && !this.passwordMismatch(field) && !this.minLength(field);
  }
  
  //sprawdzanie poprawności hasła
  checkPasswords(field: AbstractControl) {
    return this.dirty(field) && this.passwordMismatch(field);
    
  }

  //porównywanie hasła
  comparePasswords(fg: FormGroup) {
    const password = fg.get('Password');
    const confirmPasswd = fg.get('ConfirmPassword');
    if (confirmPasswd.errors == null) {
      if (password.value !== confirmPasswd.value) {
        confirmPasswd.setErrors({passwordMismatch: true});
      } else {
        confirmPasswd.setErrors(null);
      }
    }
  }


  required(field: AbstractControl):boolean {
    return field.hasError('required');
  }
  touched(field: AbstractControl):boolean {
    return field.touched;
  }
  dirty(field: AbstractControl):boolean {
    return field.dirty;
  }
  minLength(field: AbstractControl): boolean {
    return field.hasError('minlength');
  }
  passwordMismatch(field: AbstractControl): boolean {
    return field.hasError('passwordMismatch');
  }
  
}


