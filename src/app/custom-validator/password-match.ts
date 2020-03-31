import { FormGroup } from '@angular/forms';


//Fonction permettant de verifier la correspondance des mots de passes

export function PasswordMatch(password: string, confirmPassword: string) {
  
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[password];
        const matchingControl = formGroup.controls[confirmPassword];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            return;
        }

        if (control.value !== matchingControl.value) {
            matchingControl.setErrors(
                { 
                    passwordMatch: true
                 }
                );
        } else {
            matchingControl.setErrors(null);
        }
    }
}