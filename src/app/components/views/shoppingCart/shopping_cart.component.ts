import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild }		from '@angular/core';

import { IOrder, IProduct } from '@interfaces/index';

@Component({

	selector: 'shopping-cart',

	templateUrl: './shopping_cart.component.html',

	styleUrls: ['./shopping_cart.component.scss']

})

export class ShoppingCartComponent implements OnInit {

	@Input() order?:	IOrder;

	public total?:		number;

	@Output() quantityUpdated: EventEmitter<IProduct> = new EventEmitter<IProduct>();

	constructor() {}

	ngOnInit() {

		this.setTotal();

	}

	public onQuantityUpdated($event: IProduct): void {

		this.quantityUpdated.emit($event);

	}

	public setTotal(): void {

		let total = 0;

		for (let product of this.order!.products)

			total += product.price;

		this.total	= total;

	}

}
