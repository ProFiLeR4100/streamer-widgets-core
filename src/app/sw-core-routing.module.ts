import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from "./components/home-component/home.component";
import {ModulesListComponent} from "./components/modules-list/modules-list.component";
import {LazyModuleGuardService} from "./services/lazy-module-guard.service";
import {ModulesNotFoundComponent} from "./components/module-not-found/modules-not-found.component";


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
	},
	{
		path: '**',
		component: ModulesNotFoundComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { useHash: false, onSameUrlNavigation: "reload"})],
	exports: [RouterModule]
})
export class SwCoreRoutingModule {
}
