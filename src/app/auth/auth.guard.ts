import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AuthService} from '../shared/services/auth.service';
import {map, take} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.userSubject.pipe(
      take(1),
      map(user => {
      const isAuth = !!user;
      if (isAuth) {
        return true;
      }
      return this.router.createUrlTree(['/auth']);
    }));
  }

  constructor(private authService: AuthService, private router: Router) {
  }

}
