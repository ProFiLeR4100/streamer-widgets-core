import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {faCog, faTv} from '@fortawesome/free-solid-svg-icons';
import {HeaderService} from "../../services/header.service";

@Component({
	selector: 'sw-home-component',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
	@ViewChild('headerTemplate', {static: true})
	private headerTemplate: TemplateRef<any>;

	constructor(private headerService: HeaderService) {
	}

	ngOnInit(): void {
		this.headerService.updateHeader(this.headerTemplate, {
			icons: {
				cog: faCog,
				tv: faTv
			}
		});
	}

}
