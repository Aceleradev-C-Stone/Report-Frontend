import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { User } from 'src/app/models/User';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  profilePicGeneratorUrl: string;

  user: User;
  firstName: string;

  constructor(
    private accountService: AccountService
  ) {
    this.setupProfilePicGeneratorUrl();
  }

  ngOnInit() {
    this.subscribeToUser();
  }

  logout() {
    this.accountService.logout();
  }

  private subscribeToUser() {
    this.accountService.user
      .subscribe(user => {
        if (user) {
          this.user = user;
          this.firstName = this.getUserFirstName(user.name);
        }
      });
  }

  private getUserFirstName(fullName: string) {
    return fullName.split(' ')[0];
  }

  private setupProfilePicGeneratorUrl() {
    this.profilePicGeneratorUrl = environment.tinygraphsUrl;
  }

}
