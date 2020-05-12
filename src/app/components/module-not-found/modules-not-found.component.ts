import {Component, OnDestroy, OnInit} from '@angular/core';
import {NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";
import {forkJoin, from, Observable, Subscription} from "rxjs";
import {RouterService} from "../../services/router.service";
import {ModuleData} from "../../models/module.model";
import {ModuleService} from "../../services/module.service";

// TODO: Rewrite this shitcode.
@Component({
	selector: 'sw-modules-list',
	templateUrl: './modules-not-found.component.html',
	styleUrls: ['./modules-not-found.component.less']
})
export class ModulesNotFoundComponent implements OnInit, OnDestroy {
	subscription: Subscription = new Subscription();

	constructor(private router:Router, private routerService: RouterService, private moduleService: ModuleService) {
		this.subscription.add(this.router.events.subscribe(async routerEvent => {
			// start/end events
			if (routerEvent instanceof NavigationEnd || routerEvent instanceof NavigationStart) {

				console.log("Route:", routerEvent.url.startsWith('/') ? routerEvent.url.substring(1) : routerEvent.url);

				let moduleUrl = routerEvent.url.startsWith('/') ? routerEvent.url.substring(1) : routerEvent.url;
				if(moduleUrl.includes("/")) {
					let parts = moduleUrl.split("/").slice(0,2);
					if (parts.length === 2) {
						moduleUrl = parts.join("/");
					}
				}

				if (!this.routerService.routeIsRegistered(moduleUrl)) {
					this.loadModulesAndRegisterRoutes().subscribe(() => {
						console.log("Modules routes registered.");
						if(this.routerService.routeIsRegistered(moduleUrl)) {
							console.log("Redirecting to module.");
							this.router.navigate([this.router.url]);
						} else {
							console.error("FUCK YOU");
						}
					});
				}
			}
		}))
		;
	}

	ngOnInit(): void {
	}

	loadModulesAndRegisterRoutes(): Observable<void> {
		return from(new Promise<void>((resolve, reject) => {
			let exportsToBeFinished = [];

			this.moduleService.loadModules()
				.subscribe((res: ModuleData[]) => {
					res.forEach(module => {
						if (!this.routerService.routeIsRegistered(module.path)) {
							let exportObserver = this.moduleService.loadModuleSystemJS(module);
							exportsToBeFinished.push(exportObserver);
							exportObserver.subscribe((exports) => {
								this.routerService.createAndRegisterRoute(module, exports);
							}, (err) => {
								console.error(err);
							});
						}
					});
					forkJoin(exportsToBeFinished).subscribe(() => resolve(), () => reject());
				});
		}));
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

}
