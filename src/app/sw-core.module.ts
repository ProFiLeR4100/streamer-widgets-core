import {BrowserModule} from '@angular/platform-browser';
import {
	Compiler,
	COMPILER_OPTIONS,
	CompilerFactory,
	CUSTOM_ELEMENTS_SCHEMA,
	NgModule
} from '@angular/core';
import {SwCoreRoutingModule} from './sw-core-routing.module';
import {SwCoreComponent} from './sw-core.component';
import {RouterService} from "./services/router.service";
import {ModuleService} from "./services/module.service";
import {JitCompilerFactory} from "@angular/platform-browser-dynamic";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ModuleNavigationComponent } from './components/module-navigation/module-navigation.component';
import {HttpModule} from "@angular/http";
import { HomeComponent } from './components/home-component/home.component';
import {SidebarModule} from "ng-sidebar";
import { HeaderComponent } from './components/header/header.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";

export function createCompiler(compilerFactory: CompilerFactory) {
	return compilerFactory.createCompiler();
}

@NgModule({
	declarations: [
		SwCoreComponent,
		ModuleNavigationComponent,
		HomeComponent,
		HeaderComponent
	],
	imports: [
		HttpModule,
		BrowserModule,
		FontAwesomeModule,
		BrowserAnimationsModule,
		SidebarModule.forRoot(),
		SwCoreRoutingModule
	],
	providers: [RouterService, ModuleService,
		{provide: COMPILER_OPTIONS, useValue: {}, multi: true},
		{provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
		{provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]}
	],
	bootstrap: [SwCoreComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SwCoreModule {
}
