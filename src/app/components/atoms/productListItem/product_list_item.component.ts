import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { AddToCartComponent }	from '@atoms/addToCart';

import { IProduct }				from '@interfaces/Product.interface';

@Component({

	selector: 'product-list-item',

	templateUrl: './product_list_item.component.html',

	styleUrls: ['./product_list_item.component.scss']

})

export class ProductListItemComponent implements OnInit {

	@Input() id?:		number;

	@Input() image?:	string;

	@Input() name?:		string;

	@Input() price?:	number;

	public _quantity?: 		number;

	get quantity(): number {

		return (this.addToCartComp!) ? this.addToCartComp!.quantity : this._quantity!;

	}

	@Input() set quantity(quantity: number) {

		this._quantity	= quantity;

	}

	@Output() quantityUpdated: EventEmitter<IProduct> = new EventEmitter<IProduct>();

	@ViewChild('addToCartComp') addToCartComp?: AddToCartComponent;

	public mouseoverElem	= false;

	get product(): IProduct {

		return {
	
			defaultImage:	this.image!,

			id:				this.id!,

			name:			this.name!,
			
			price:			this.price!,

			quantity:		this.quantity

		};

	}

	constructor() { }

	ngOnInit() {}

	public onQuantityUpdated(): void {

		this.quantityUpdated.emit(this.product);

	}
}	
