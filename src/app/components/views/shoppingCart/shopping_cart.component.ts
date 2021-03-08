import { Component, EventEmitter, HostListener, Inject, Input, OnInit, Output, ViewChild }		from '@angular/core';

import { IOrder } from '@interfaces/index';

@Component({

	selector: 'shopping-cart',

	templateUrl: './shopping_cart.component.html',

	styleUrls: ['./shopping_cart.component.scss']

})

export class ShoppingCartComponent implements OnInit {

	@Input() order?:	IOrder;

	public total?:		string;

	constructor() {}

	ngOnInit() {

		this.setTotal();

	}

	public setTotal(): void {

		let total = 0;

		for (let product of this.order!.products)

			total += product.price;

		this.total	= '$' + total;

	}

}
