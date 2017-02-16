import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

@Component({
  selector: 'cash-signin',
  styleUrls: ['./signin.component.scss'],
  templateUrl: './signin.component.html'
})

export class SignInComponent implements OnInit {

  private signInForm: FormGroup;

  constructor(private authService: AuthService) {

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

    this.authService.signin(user).subscribe(
      data => console.log(data),
      error => console.error(error)
    )
  }
}
