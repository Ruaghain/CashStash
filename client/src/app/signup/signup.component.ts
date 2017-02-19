import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "../auth/user.model";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'cash-signup',
  styleUrls: ['./signup.component.scss'],
  templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {

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
      data => {
        //There must be a better way of doing this
        this.authService.signin(user).subscribe(
          data => {
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('fullName', data.fullName);
          }, error => {
            console.log('There was an error logging in created user: ' + error);
          }
        );
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
