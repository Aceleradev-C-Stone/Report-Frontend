import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/User';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public userForm: FormGroup;
  public passwordForm: FormGroup;
  public user: User;

  // Convenience getter for easy access to form fields
  get userFields() { return this.userForm.controls; }
  get passwordFields() { return this.passwordForm.controls; }

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.subscribeToUser();
    this.createForms();
  }

  onSavePress() {
    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }

    let params: any = {
      name: this.userFields.name.value
    };

    if (this.passwordForm.valid) {
      params = {
        name: this.userFields.name.value,
        password: this.passwordFields.newPassword.value
      };
    }

    this.accountService.update(this.user.id, params)
      .pipe(first())
      .subscribe(user => {
      }, error => {
        this.alertService.error(error);
      });
  }

  private createForms() {
    this.userForm = this.fb.group({
      name: [this.user.name, Validators.required]
    });
    this.passwordForm = this.fb.group({
      newPassword: ['', Validators.required],
      retypePassword: ['', Validators.required]
    }, { validators: this.validatePassword });
  }

  private subscribeToUser() {
    this.accountService.user
      .subscribe(user => this.user = user);
  }

  private validatePassword(group: FormGroup) {
    let newPassword = group.get('newPassword').value;
    let retypePassword = group.get('retypePassword').value;
    return newPassword === retypePassword ? null : { notSame: true };
  }

}
