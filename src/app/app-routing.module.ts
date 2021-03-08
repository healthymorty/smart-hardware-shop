import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { StoreFrontComponent } from '@pages/storeFront/store_front.component';

const routes: Routes = [

	//{ path: '', data: { pageName: 'store-front' }, redirectTo: 'store-front', pathMatch: 'full' },

	{ path: 'store-front', component:  StoreFrontComponent, data: { pageName: 'store-front', queryParams: {} } }
	
];

@NgModule({

	imports: [RouterModule.forRoot(routes, {useHash: false})],

	exports: [RouterModule]

})

export class AppRoutingModule { }
