import {Http} from '@angular/http';
import {ModuleData} from '../models/module.model';
import {Router, Route} from '@angular/router';
import {Injectable, Compiler} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ModuleService} from "./module.service";

@Injectable()
export class RouterService {
	existingRoutes: BehaviorSubject<Route[]>;
	private readonly originalRoutes: Route[];

	constructor(private router: Router, private compiler: Compiler, private http: Http, private moduleService: ModuleService) {
		this.originalRoutes = this.routes;
		this.existingRoutes = new BehaviorSubject<Route[]>(this.routes);
	}

	private get routes(): Route[] {
		var routesToReturn = this.router.config;
		return routesToReturn.filter(x => x.path !== "");
	}

	createAndRegisterRoute(moduleToRegister: ModuleData, exports: any) {
		let route: Route = {
			path: 'module/' + moduleToRegister.path,
			loadChildren: () => exports[`${moduleToRegister.moduleName}`]
		};

		this.registerRoute(route);
	}

	routeIsRegistered(path: string) {
		return this.router.config.some(r => r.path === path);
	}

	registerRoute(route: Route) {
		if (this.routeIsRegistered(route.path)) return;

		// ! DO NOT TOUCH !
		// inserts lazy modules before 404 page
		this.router.config.splice(this.router.config.length - 1, 0, route);
		this.updateRouteConfig(this.router.config);
	}

	private updateRouteConfig(config) {
		this.router.resetConfig(config);
		this.existingRoutes.next(this.routes);
	}
}
