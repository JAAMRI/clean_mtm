import { FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export const EmailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
});
export const LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
})

export const registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirm_password: new FormControl('', [Validators.required]),
    given_name: new FormControl('', Validators.required),
    family_name: new FormControl('', Validators.required),
    birthdate: new FormControl(''),
    opt_in: new FormControl(),
    postal_code: new FormControl('')
}, {
    validators: checkPasswords
}
);

function checkPasswords(userGroup: FormGroup) {
    const condition = userGroup.get('password').value !== userGroup.get('confirm_password').value;
    return condition ? { NotSamePassword: true } : null;

}

// Error state matching class for confirm password
export class PasswordErrorMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.dirty && form.invalid;
    }
}

