import {Component, OnInit} from '@angular/core';
import {Route} from "@angular/router";
import {Observable} from "rxjs";
import {RouterService} from "../../services/router.service";

@Component({
	selector: 'sw-module-navigation',
	templateUrl: './module-navigation.component.html',
	styleUrls: ['./module-navigation.component.less']
})
export class ModuleNavigationComponent implements OnInit {

	existingRoutes$: Observable<Route[]>;

	constructor(private routerService: RouterService) {
	}

	ngOnInit(): void {
		this.existingRoutes$ = this.routerService.existingRoutes;
	}

}
