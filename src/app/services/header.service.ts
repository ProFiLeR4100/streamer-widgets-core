import {Observable, Subject} from 'rxjs';
import {Injectable, TemplateRef} from "@angular/core";
import {HeaderTemplateModel} from "../models/header-template.model";

@Injectable()
export class HeaderService {
	public onHeaderUpdate: Subject<HeaderTemplateModel> = new Subject();

    updateHeader(template: TemplateRef<any>, context?: any) {
    	this.onHeaderUpdate.next({
			template,
			context
		});
	}

}
