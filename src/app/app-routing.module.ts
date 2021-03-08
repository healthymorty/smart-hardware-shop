import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { StoreFrontComponent } from '@pages/storeFront/store_front.component';

const routes: Routes = [

	{ path: 'store-front', component:  StoreFrontComponent }
	
];

@NgModule({

	imports: [RouterModule.forRoot(routes, {useHash: false})],

	exports: [RouterModule]

})

export class AppRoutingModule { }
