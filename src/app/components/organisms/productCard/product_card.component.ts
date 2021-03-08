import { Component, EventEmitter, HostListener, Inject, Input, Output, ViewChild }		from '@angular/core';

import { AddeToCartComponent } from '@atoms/addToCart/add_to_cart.component';

import { IProduct }	from '@interfaces/Product.interface'; 

@Component({

	selector: 'product-card',

	templateUrl: './product_card.component.html',

	styleUrls: ['./product_card.component.scss']

})

export class ProductCardComponent {

	@Input() description?:	string;
	
	@Input() defaultImage?:	string;

	@Input() discount?:		number;

	@Input() id?:			number;

	@Input() images?:		string[];

	@Input() name?:			string;
	
	@Input() price?:		number;

	public _quantity?: 		number;

	get quantity(): number {

		return (this.addToCartComp!) ? this.addToCartComp?.quantity : this._quantity!;

	}

	@Input() set quantity(quantity: number) {

		this._quantity	= quantity;

		this.inCart	= (!!quantity);

	}

	@Output() addItemToCart:	EventEmitter<void> = new EventEmitter<void>();

	@Output() quantityUpdated: 	EventEmitter<number> = new EventEmitter<number>();

	@ViewChild('addToCartComp') addToCartComp?: AddeToCartComponent;

	get product(): IProduct {

		return {

			description:	this.description!,
	
			defaultImage:	this.defaultImage!,

			discount:		this.discount!,

			id:				this.id!,

			images:			this.images!,

			name:			this.name!,
			
			price:			this.price!,

			quantity:		this.quantity!

		};

	}

	public inCart	= false;

	constructor() {}

	public onQuantityUpdated(): void {

		this.quantityUpdated.emit(this.quantity);

	}

}
