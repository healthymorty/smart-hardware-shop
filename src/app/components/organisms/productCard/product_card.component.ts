import { Component, EventEmitter, HostListener, Inject, Input, Output, ViewChild }		from '@angular/core';

@Component({

	selector: 'product-card',

	templateUrl: './product_card.component.html',

	styleUrls: ['./product_card.component.scss']

})

export class ProductCardComponent {

	@Input() description?:	string;
	
	@Input() defaultImage?:	string;

	@Input() discount?:		number;

	@Input() images?:		string[];

	@Input() name?:			string;
	
	@Input() price?:		number;

	constructor() {}

}
