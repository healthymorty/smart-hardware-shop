import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild }		from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA }	from '@angular/material/dialog';

import { 

	InputComponent,
	
	PagingComponent 

}	from '@atoms/index';

import { 

	IOrder,
	
	IProduct,

	IUser

}	from '@interfaces/index';

import { 
	
	QueryService,

	URLManagerService

}	from '@services/index';

import { Paging }				from '@classes/Paging.class';

import { ProductCardComponent } from '@organisms/index';

@Component({

	selector: 'store-front',

	templateUrl: './store_front.component.html',

	styleUrls: ['./store_front.component.scss']

})

export class StoreFrontComponent implements OnInit {

	@ViewChild('bottomPagingComp') bottomPagingComp?: PagingComponent;

	@ViewChild('searchInputComp') searchInputComp?:	InputComponent;

	@ViewChild('topPagingComp') topPagingComp?: PagingComponent;

	public cartOrder?:		IOrder;

	public page				= new Paging(this.getNewPage.bind(this));

	public products?:		IProduct[];

	get pageNum(): number {

		return (this._URLManagerService.hasQueryParam('page')) ?

			+this._URLManagerService.getQueryParam('page') : 1;

	}

	public pageSize			= 25;

	public recommendeds?:	IProduct[];

	public searchTimer?:	any;

	public searchText		= this.searchValue;

	get searchValue(): string | undefined {

		const searchValue	= (this._URLManagerService.hasQueryParam('search')) ?
		
			this._URLManagerService.getQueryParam('search') : undefined;

		return searchValue;

	}

	public querysTotalRowCount?:	number;

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

	public async getNewPage(pageNum: number): Promise<IProduct[]> {

		const dataProducts	= await this._queryService.callRest('GET', 'http://localhost:8080/products?' + this.getPageQueryString(pageNum));

		this.setQuerysTotalRowCount(pageNum, dataProducts.response.headers.get('X-Total-Count'));

		return [...dataProducts.response.body];

	}

	public getPageQueryString(pageNum: number): string {

		const searchParam	= (this.searchValue) ? 'q=' + this.searchValue + '&' : '';

		return searchParam + '_page='+ pageNum +'&_limit=' + this.pageSize;

	}

	public getProductIdMap(products: IProduct[]): { [key: number]: IProduct } {

		const productIdMap: { [key: number]: IProduct }	= {};

		for (let product of products) productIdMap[product.id] = product;

		return productIdMap;

	}

	public async getSpecificProducts(queryString: string): Promise<IProduct[]> {

		const dataProducts	= await this._queryService.callRest('GET', 'http://localhost:8080/products/?' + queryString);

		return dataProducts.response.body;
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

	public onAddItemToCart(productCardComp: ProductCardComponent): void {

		this.cartOrder?.products.push(productCardComp.product);

	}

	public async onPage(pageNum = this.pageNum): Promise<void> {

		this.updatePagingComp(pageNum);

		const dataProducts	= await this.page.getPage(pageNum);

		this.products		= [];

		setTimeout(() => {

			this.products	= [...dataProducts];

		}, 0);	

	}

	public async onSearch(): Promise<void> {

		(this._URLManagerService.hasQueryParam('search') && !this.searchInputComp!.isValid) ?

				this._URLManagerService.clearQueryParam('search') :
				
				this._URLManagerService.updateURLFromParams({search: this.searchInputComp!.text});

		clearTimeout(this.searchTimer);

		this.searchTimer	= setTimeout(async () => {
			
			this.page.clear();

			this.onPage(1);

		}, 2000);

	}

	public async setCartOrder(): Promise<void> {
		
		const order			= await this.getCartOrder();

		const multiProductIdQueryString	= this.getMultiProductIdQueryString(order);

		const dataProducts	= await this.getSpecificProducts(multiProductIdQueryString);

		this.cartOrder		= this.mergeOrderProductsWithProducts(order, dataProducts);

	}

	public async setRecommendeds(): Promise<void> {

		const dataRecommendeds	= await this._queryService.callRest('GET', 'http://localhost:8080/recommendeds');

		this.recommendeds		= [...dataRecommendeds.response.body];

	}

	public setQuerysTotalRowCount(pageNum: number, HeadersXTotalCount: number): void {

		if (pageNum === 1) this.querysTotalRowCount	= HeadersXTotalCount;

	}

	public async setUser(): Promise<void> {

		const dataUser	= await this._queryService.callRest('GET', 'http://localhost:8080/users/1');

		this.user		= dataUser.response.body;

	}

	public updatePagingComp(pageNum: number): void {

		if (this.topPagingComp!.pageNum !== pageNum) this.topPagingComp!.pageNum = pageNum;

		if (this.bottomPagingComp!.pageNum !== pageNum) this.bottomPagingComp!.pageNum = pageNum;

	}

}
