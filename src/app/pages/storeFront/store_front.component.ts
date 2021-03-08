import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild }		from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA }	from '@angular/material/dialog';

import { CheckboxComponent }	from '@atoms/checkbox';

import { 

	IOrder,
	
	IProduct,

	IUser

}	from '@interfaces/index';

import { 
	
	QueryService,

	URLManagerService

}	from '@services/index';

import { Paging }	from '@classes/paging.class';

@Component({

	selector: 'store-front',

	templateUrl: './store_front.component.html',

	styleUrls: ['./store_front.component.scss']

})

export class StoreFrontComponent implements OnInit {

	public cartOrder?:		IOrder;

	public page				= new Paging(this.getNewPage.bind(this));

	public products?:		IProduct[];

	get pageNum(): number {

		return (this._URLManagerService.hasQueryParam('page')) ?

			this._URLManagerService.getQueryParam('page') : 1;

	}

	public pageSize			= 25;

	public recommendeds?:	IProduct[];

	public totalProducts	= 1015;

	public user?:			IUser;

	constructor(

		private _queryService:		QueryService,

		private _URLManagerService:	URLManagerService

	) {}

	async ngOnInit(): Promise<void> {

		await this.setUser();

		this.setCartOrder();

		this.setRecommendeds();

		this.onPage();

	}

	public async getCartOrder(): Promise<IOrder> {
		console.log(this.user);
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

	public async getNewPage(pageNum: number): Promise<IProduct> {

		const dataProducts	= await this._queryService.callRest('GET', 'http://localhost:8080/products?_page='+ pageNum +'&_limit=' + this.pageSize);

		return [...dataProducts.response.body];

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

	public async onPage(pageNum = this.pageNum): Promise<void> {

		const dataProducts	= await this.page.getPage(pageNum);
		console.log(dataProducts);
		this.products		= [];

		setTimeout(() => {

			this.products	= [...dataProducts];

		}, 0);	

	}

	public async searchProducts(queryString: string): Promise<IProduct[]> {
		console.log(queryString);
		const dataProducts	= await this._queryService.callRest('GET', 'http://localhost:8080/products/?' + queryString);

		return dataProducts.response.body;
	}

	public async setCartOrder(): Promise<void> {
		
		const order			= await this.getCartOrder();

		const multiProductIdQueryString	= this.getMultiProductIdQueryString(order);

		const dataProducts	= await this.searchProducts(multiProductIdQueryString);

		this.cartOrder		= this.mergeOrderProductsWithProducts(order, dataProducts);

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
