import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SwCoreComponent} from "./sw-core.component";
import {HomeComponent} from "./components/home-component/home.component";


const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/home',
	},
	{
		path: 'home',
		component: HomeComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class SwCoreRoutingModule {
}
