import { AuthService } from './../_services/auth.service';
import { Observable } from 'rxjs/Rx';
import { AlertifyService } from './../_services/alertify.service';
import { UserService } from './../_services/user.service';
import { Resolve, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { User } from "../_models/User";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/catch';

@Injectable()
export class MemberEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router,
        private alertify: AlertifyService,
        private authService: AuthService) {}

        resolve(route: ActivatedRouteSnapshot): Observable<User> {
            return this.userService.getUser(this.authService.decodedToken.nameid).catch(error => {
                this.alertify.error('Problem retrieving data');
                this.router.navigate(['/members']);
                return Observable.of(null);
            });
        }
}
