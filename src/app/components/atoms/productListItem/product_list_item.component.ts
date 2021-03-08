import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({

	selector: 'product-list-item',

	templateUrl: './product_list_item.component.html',

	styleUrls: ['./product_list_item.component.scss']

})

export class ProductListItemComponent implements OnInit {

	@Input() image?:	string;

	@Input() name?:		string;

	@Input() price?:	string;

	@Input() quantity?:	number;
	
	constructor() { }

	ngOnInit() {}
}	
