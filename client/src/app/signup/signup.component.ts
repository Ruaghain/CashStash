import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'cash-signup',
  styleUrls: ['/signup.component.scss'],
  templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {

  private signUpForm: FormGroup;

  constructor(private authService: AuthService) {

  }

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

  onSubmit = () => {
    const user = new User(
      this.signUpForm.value.username,
      this.signUpForm.value.firstName,
      this.signUpForm.value.lastName,
      this.signUpForm.value.email,
      this.signUpForm.value.password
    );

    this.authService.signup(user).subscribe(
      data => console.log(data),
      error => console.error(error)
    );
    //this.signUpForm.reset();
  }
}
