import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {faBars} from '@fortawesome/free-solid-svg-icons';
import {HeaderService} from "../../services/header.service";

@Component({
	selector: 'sw-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

	@Output()
	public onSidebarToggle: EventEmitter<boolean> = new EventEmitter();

	public _faBars = faBars;
	public _template: TemplateRef<any>;
	public _headerContext: any;

	constructor(private headerService: HeaderService) {
	}

	ngOnInit(): void {
		this.headerService
			.onHeaderUpdate
			.subscribe((headerValue) => {
				this._template = headerValue.template;
				this._headerContext = headerValue.context;
			});
	}

}
