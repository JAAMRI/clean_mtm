import { FormGroup, FormControl, Validators } from '@angular/forms';

export function createUserForm() {
  const userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    postal: new FormControl('', Validators.required),
    gender: new FormControl(''),
    password: new FormControl('', Validators.required),
    confirm_password: new FormControl('', Validators.required),
    dob: new FormControl(),
    hearFromUs: new FormControl()
  });
  return userForm;
}