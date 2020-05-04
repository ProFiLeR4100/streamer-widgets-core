import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./components/home-component/home.component";
import {ModulesListComponent} from "./components/modules-list/modules-list.component";
import {LazyModuleGuardService} from "./services/lazy-module-guard.service";


const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/home',
	},
	{
		path: 'home',
		component: HomeComponent
	},
	{
		path: 'module',
		canActivateChild: [LazyModuleGuardService],
		component: ModulesListComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class SwCoreRoutingModule {
}
