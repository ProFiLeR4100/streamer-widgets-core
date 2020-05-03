import {Component, OnInit} from '@angular/core';
import {ModuleData} from "./models/module.model";
import {ModuleService} from "./services/module.service";
import {RouterService} from "./services/router.service";
import {NavigationEnd, NavigationError, NavigationStart, Router} from "@angular/router";

@Component({
	selector: 'sw-core',
	templateUrl: './sw-core.component.html',
	styleUrls: ['./sw-core.component.less']
})
export class SwCoreComponent implements OnInit {
	title = 'streamer-widgets-core';
	installedModules$: any;

	constructor(private routerService: RouterService,
				private moduleService: ModuleService,
				public router: Router) {
		this.router.events.subscribe(async routerEvent => {
			if (routerEvent instanceof NavigationStart) {
				if (routerEvent.url.includes("/module/") && !this.routerService.routeIsRegistered(routerEvent.url.startsWith('/') ? routerEvent.url.substring(1) : routerEvent.url)) {
					console.log("YAY");
					// TODO: ADD LAZY LOADING
				}
			}

			if (routerEvent instanceof NavigationEnd) {
			}

			if (routerEvent instanceof NavigationError) {
			}
		});
	}

	public _sidebarOpened: boolean = false;

	public _toggleSidebar() {
		this._sidebarOpened = !this._sidebarOpened;
	}

	ngOnInit(): void {
		this.installedModules$ = this.moduleService.loadModules()
			.subscribe((res: ModuleData[]) => {
				res.forEach(module => {
					if (module.registered) {
						this.registerRoute(module);
					}
				});
			});
	}

	enableModule(moduleToEnable: ModuleData) {
		// enable or disable module
		if (this.isRegistered(moduleToEnable)) {
			this.routerService.unRegisterRoute(moduleToEnable.path);
		} else {
			this.registerRoute(moduleToEnable);
		}
	}

	isRegistered(moduleData: ModuleData | any): boolean {
		return this.routerService.routeIsRegistered(moduleData.path);
	}


	private registerRoute(moduleToEnable: ModuleData) {
		this.moduleService.loadModuleSystemJS(moduleToEnable).subscribe((exports) => {
			this.routerService.createAndRegisterRoute(moduleToEnable, exports);
		}, (err) => {
			console.error(err);
		});
	}
}
