import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faBars, faCog, faTv} from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'sw-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {

	@Output()
	public onSidebarToggle: EventEmitter<boolean> = new EventEmitter();

	public _faCog = faCog;
	public _faTv = faTv;
	public _faBars = faBars;

	constructor() {
	}

	ngOnInit(): void {
	}

}
