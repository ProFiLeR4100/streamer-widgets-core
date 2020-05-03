import {Component, OnInit} from '@angular/core';
import {ModuleData} from "./models/module.model";
import {ModuleService} from "./services/module.service";
import {RouterService} from "./services/router.service";
import {Router} from "@angular/router";

@Component({
	selector: 'sw-core',
	templateUrl: './sw-core.component.html',
	styleUrls: ['./sw-core.component.less']
})
export class SwCoreComponent implements OnInit {
	title = 'streamer-widgets-core';
	installedModules$: any;

	public template = `
	`;

	constructor(private routerService: RouterService,
				private moduleService: ModuleService,
				public router: Router) {
	}

	ngOnInit(): void {
		this.installedModules$ = this.moduleService.loadModules()
			.subscribe((res: ModuleData[]) => {
				res.forEach(module => {
					if (module.registered) {
						this.registerRoute(module);
					}
				});
			})
		;
	}

	enableModule(moduleToEnable: ModuleData) {
		// enable or disable module
		if(this.isRegistered(moduleToEnable)) {
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
