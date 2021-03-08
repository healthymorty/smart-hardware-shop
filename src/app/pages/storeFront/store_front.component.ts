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

	public cartOrder?:		IOrder;

	public products:		IProduct[]	= [];

	public recommendeds:	IProduct[]	= [];

	public user?:			IUser;

	constructor(

		private _queryService:		QueryService

	) {}

	async ngOnInit(): Promise<void> {

		await this.setUser();

		this.setCartOrder();

		this.setRecommendeds();

		this.setProducts();

	}

	public async getCartOrder(): Promise<IOrder> {

		const dataOrder	= await this._queryService.callRest('GET', 'http://localhost:8080/carts/' + this.user!.id);

		return dataOrder.response.body;

	}

	public getMultiProductIdQueryString(order: IOrder): string {

		let multiProductIdQueryString	= '';

		for (let product of order.products)

			multiProductIdQueryString += 'id=' + product.id + '&&';

		return (multiProductIdQueryString !== '') ? 
		
			multiProductIdQueryString.substring(0, multiProductIdQueryString.length-2) : '';

	}

	public getProductIdMap(products: IProduct[]): { [key: number]: IProduct } {

		const productIdMap: { [key: number]: IProduct }	= {};

		for (let product of products) productIdMap[product.id] = product;

		return productIdMap;

	}

	public mergeOrderProductsWithProducts(order: IOrder, products: IProduct[]): IOrder {

		const orderProducts	= [];

		const productIdMap	= this.getProductIdMap(products);
		
		for (let product of order.products)

			if (productIdMap[product.id])

				orderProducts.push({...product, ...productIdMap[product.id]});

		order.products		= [...orderProducts];

		return order;

	}

	public async searchProducts(queryString: string): Promise<IProduct[]> {

		const dataProducts	= await this._queryService.callRest('GET', 'http://localhost:8080/products/?' + queryString);

		return dataProducts.response.body;
	}

	public async setCartOrder(): Promise<void> {
		
		const order			= await this.getCartOrder();

		const multiProductIdQueryString	= this.getMultiProductIdQueryString(order);

		const dataProducts	= await this.searchProducts(multiProductIdQueryString);

		this.cartOrder		= this.mergeOrderProductsWithProducts(order, dataProducts);

	}
	

	public async setProducts(): Promise<void> {
		console.log(await this._queryService.callRest('GET', 'http://localhost:8080/products?id=1&&2'));
		//const dataProducts	= await this._queryService.callRest('GET', 'http://localhost:8080/products');

		this.products		= []; //[...dataProducts.response.body];

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
