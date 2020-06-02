import { FormGroup, FormControl, Validators } from '@angular/forms';

export const EmailForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
});
export const LoginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
})