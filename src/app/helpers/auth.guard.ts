import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { AccountService } from '../services/account.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private accountService: AccountService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.userValue;
        if (user) {
            // Authorized, so return true
            return true;
        }

        // Not logged in, so redirect to login page with the return url
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}