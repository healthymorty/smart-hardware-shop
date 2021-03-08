import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild }		from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA }	from '@angular/material/dialog';

import { CheckboxComponent }	from '@atoms/checkbox';

import { 

	IOrder,
	
	IProduct,

	ISettings,

	IUser

}	from '@interfaces/index';

import { QueryService }			from '@services/Query.service';

@Component({

	selector: 'store-front',

	templateUrl: './store_front.component.html',

	styleUrls: ['./store_front.component.scss']

})

export class StoreFrontComponent implements OnInit {

	public order?:			IOrder;

	public products:		IProduct[]	= [];

	public recommendeds:	IProduct[]	= [];

	public user?:			IUser;

	constructor(

		private _queryService:		QueryService

	) {}

	async ngOnInit(): Promise<void> {

		await this.setUser();

		this.setOrder();

		this.setRecommendeds();

		this.setProducts();

	}

	public async setOrder(): Promise<void> {
		
		const dataProducts	= await this._queryService.callRest('GET', 'http://localhost:8080/carts/' + this.user!.id);

		this.order			= dataProducts.response.body;

	}
	

	public async setProducts(): Promise<void> {

		const dataProducts	= await this._queryService.callRest('GET', 'http://localhost:8080/products');

		this.products		= [...dataProducts.response.body];

	}

	public async setRecommendeds(): Promise<void> {

		const dataRecommendeds	= await this._queryService.callRest('GET', 'http://localhost:8080/recommendeds');

		this.recommendeds		= [...dataRecommendeds.response.body];
	}

	public async setUser(): Promise<void> {

		const dataUser	= await this._queryService.callRest('GET', 'http://localhost:8080/users/1');

		this.user		= dataUser.response.body;

	}

}
