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
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
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
        registerAction(this.form.value as RegisterRequestInterface)
      );
      this.authService
        .register(this.form.value as RegisterRequestInterface)
        .subscribe((currentUser: CurrentUserInterface) => {
          console.log('currentUser', currentUser);
        });
    } else {
      console.log('All fields are required');
    }
  }
}
