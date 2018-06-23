import { FormControl } from '@angular/forms';
export class NameValidator {
    static isValid(control: FormControl){
        const re = /^([a-zA-Z0-9_\-\.]+)$/
            .test(
                control.value
            );
            if(re){
                return null;
            }
            return {
                invalidUsername: true
            };
    }
}