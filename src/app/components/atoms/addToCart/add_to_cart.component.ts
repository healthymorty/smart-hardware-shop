import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({

	selector: 'add-to-cart',

	templateUrl: './add_to_cart.component.html',

	styleUrls: ['./add_to_cart.component.scss']

})

export class AddeToCartComponent implements OnInit {

	public _quantity	= 0;

	get quantity(): number {

		return this._quantity;

	}

	@Input() set quantity(quantity: number) {

		this._quantity	= (quantity) ? quantity : 0;

	};

	@Output() quantityUpdated: EventEmitter<number> = new EventEmitter<number>();

	public mouseoverElem	= false;

	constructor() { }

	ngOnInit(): void {}

	public onAdd(): void {

		this.quantity	+= 1;

		this.quantityUpdated.emit(this.quantity);
		
	}

	public onMinus(): void {

		this.quantity	-= 1;

		this.quantityUpdated.emit(this.quantity);

	}

}	
