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

	constructor(public router: Router) {
	}

	public _sidebarOpened: boolean = false;

	public _toggleSidebar() {
		this._sidebarOpened = !this._sidebarOpened;
	}

	ngOnInit(): void {
	}
}
