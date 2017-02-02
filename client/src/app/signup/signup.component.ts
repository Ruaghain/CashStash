import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../auth/user.model";

@Component({
  selector: 'cash-signup',
  templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;

  ngOnInit() {
    this.signUpForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required
      ]),
      firstName: new FormControl(null),
      lastName: new FormControl(null),
      email: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required
      ])
    })
  }

  onSubmit() {
    const user = new User(
      this.signUpForm.value.username,
      this.signUpForm.value.email,
      this.signUpForm.value.firstName,
      this.signUpForm.value.lastName,
      this.signUpForm.value.password
    );

    this.signUpForm.reset();
  }
}
