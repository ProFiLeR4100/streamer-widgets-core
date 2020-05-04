import {Observable, Subject} from 'rxjs';
import {Injectable, TemplateRef} from "@angular/core";
import {ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from "@angular/router";

@Injectable()
export class LazyModuleGuardService {
	constructor() {
	}

	canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
		: Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		console.log(route, state);

		return new Promise((resolve, reject) => {
			resolve(true);

			// this.somePromiseYouAlreadyHave.then(() => {
			// 	resolve(true)
			// })
		});
	}

}
