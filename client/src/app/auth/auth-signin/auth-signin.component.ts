import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../auth-service/auth.service";
import { User } from "../user.model";
import { Router } from "@angular/router";

@Component({
  selector: 'cash-signin',
  styleUrls: ['./auth-signin.component.scss'],
  templateUrl: './auth-signin.component.html'
})

export class AuthSignInComponent implements OnInit {

  private signInForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit() {
    this.signInForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    })
  }

  onSubmit = () => {
    const user = new User(
      this.signInForm.value.username,
      this.signInForm.value.password
    );

    this.authService.signin(user).subscribe(() => {
        this.router.navigateByUrl('/');
      },
      error => {
        this.signInForm.value.password.reset();
        console.error(error)
      }
    )
  };

  onCancel = () => {
    this.router.navigateByUrl('/')
  }
}
