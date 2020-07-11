import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';
import { AlertService } from 'src/app/services/alert.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  public form: FormGroup;
  public loading = false;
  public submitted = false;

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
    this.accountService.register(this.form.value)
      .pipe(first())
      .subscribe(user => {
        this.alertService.success('Cadastrado com sucesso', {
          keepAfterRouteChange: true
        });
        this.redirectToLogin();
      }, error => {
        this.alertService.error(error);
        this.loading = false;
      });
  }

  private createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  private redirectToHome() {
    this.router.navigate(['/']);
  }

  private redirectToLogin() {
    this.router.navigate(['/login'], { relativeTo: this.route });
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
