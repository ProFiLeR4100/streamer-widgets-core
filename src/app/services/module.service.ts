import {forkJoin, Observable, of} from 'rxjs';
import {ModuleData} from './../models/module.model';
import {Http} from '@angular/http';
import {Injectable, Compiler, Inject, ReflectiveInjector, Injector, COMPILER_OPTIONS} from '@angular/core';
import {from} from "rxjs";
import {map, switchMap} from "rxjs/operators";
// Needed for the new modules
import * as AngularCore from '@angular/core';
import * as AngularCommon from '@angular/common';
import * as AngularRouter from '@angular/router';
import * as BrowserAnimations from '@angular/platform-browser/animations';
import {RouterService} from "./router.service";

declare var SystemJS: any;

@Injectable()
export class ModuleService {
	source = `http://${window.location.host}/`;
	private modules: any;

	constructor(private compiler: Compiler, private http: Http) {
		console.log(compiler);
	}

	loadModules(): Observable<ModuleData[]> {
		if (!this.modules) {
			return this.http.get("./assets/modules.json").pipe(map((value: any) => {
				this.modules = value.json();
				return this.modules;
			}));
		}

		return of(this.modules);
	}

	loadModuleSystemJS(moduleInfo: ModuleData): Observable<any> {
		let url = this.source + moduleInfo.location;
		SystemJS.set('@angular/core', SystemJS.newModule(AngularCore));
		SystemJS.set('@angular/common', SystemJS.newModule(AngularCommon));
		SystemJS.set('@angular/router', SystemJS.newModule(AngularRouter));
		SystemJS.set('@angular/platform-browser/animations', SystemJS.newModule(BrowserAnimations));
		// SystemJS.set('@clr/angular', SystemJS.newModule(AngularClarity));

		// now, import the new module
		return from(SystemJS.import(`${url}`).then((module) => {
			return this.compiler.compileModuleAndAllComponentsAsync(module[`${moduleInfo.moduleName}`]).then(compiled => {
				return module;
			});
		}));
	}
}
