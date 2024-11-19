
import { ValidatorFn, AbstractControl } from '@angular/forms';

/**
 * Validador personalizado para verificar se o valor é uma instância de File.
 */
export function fileValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const valid = control.value instanceof File;
    return valid ? null : { 'invalidFile': { value: control.value } };
  };
}
