import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { registerAction } from '../../store/actions/register.action';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { Observable } from 'rxjs';
import { isSubmittingSelector } from '../../store/selectors';
import { AppStateInterface } from 'src/app/shared/types/appState.interface';
import { AuthService } from '../../services/auth.service';
import { CurrentUserInterface } from 'src/app/shared/types/currentUser.interface';

@Component({
  selector: 'tn-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    username: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  isSubmitting$: Observable<boolean>;

  constructor(
    private store: Store<AppStateInterface>,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.initializeValues();
  }

  initializeValues(): void {
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
  }

  onSubmit(): void {
    console.log(this.form.valid);

    console.log(this.form.value);
    if (this.form.valid) {
      this.store.dispatch(
        registerAction({ request: this.form.value as RegisterRequestInterface })
      );
    } else {
      console.log('All fields are required');
    }
  }
}
