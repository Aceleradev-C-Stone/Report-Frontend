import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public loading = false;
  public submitted = false;
  public returnUrl: string;

  // Convenience getter for easy access to form fields
  get fields() { return this.form.controls; }

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    if (this.accountService.userValue) {
      this.redirectToHome();
    }
  }

  ngOnInit() {
    this.createForm();
    this.getReturnUrl();
    this.addBackgroundColor();
  }

  ngOnDestroy() {
    this.removeBackgroundColor();
  }

  onSubmit() {
    this.submitted = true;

    // Reset alerts on submit
    this.alertService.clear();

    // Stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    this.accountService.login(this.fields.email.value, this.fields.password.value)
      .pipe(first())
      .subscribe(user => {
        this.router.navigate([this.returnUrl]);
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  private createForm() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private getReturnUrl() {
    // Get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  private redirectToHome() {
    this.router.navigate(['/']);
  }

  private addBackgroundColor() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.add("bg-default");
  }

  private removeBackgroundColor() {
    var body = document.getElementsByTagName("body")[0];
    body.classList.remove("bg-default");
  }

}
