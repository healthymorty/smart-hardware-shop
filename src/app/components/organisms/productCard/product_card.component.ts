import { Component, EventEmitter, HostListener, Inject, Input, Output, ViewChild }		from '@angular/core';

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

	@Input() quantity?:		number;

	@Output() addItemToCart: EventEmitter<void> = new EventEmitter<void>();

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

	constructor() {}

	public onAddToCart(): void {

		this.addItemToCart.emit();

	}

}
