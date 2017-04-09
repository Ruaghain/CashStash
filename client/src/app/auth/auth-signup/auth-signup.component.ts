import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { User } from "../user.model";
import { AuthService } from "../auth-service/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'cash-signup',
  styleUrls: ['./auth-signup.component.scss'],
  templateUrl: './auth-signup.component.html'
})
export class AuthSignUpComponent implements OnInit {

  private signUpForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {

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
      this.signUpForm.value.password,
      this.signUpForm.value.firstName,
      this.signUpForm.value.lastName,
      this.signUpForm.value.email
    );

    this.authService.signup(user).subscribe(
      () => {
        this.router.navigateByUrl('/');
      },
      error => {
        console.error('There was an error signing up the user. ' + error);
      }
    );
  };

  onCancel = () => {
    this.router.navigateByUrl('/');
  }
}
