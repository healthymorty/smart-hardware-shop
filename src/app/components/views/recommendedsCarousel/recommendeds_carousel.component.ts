import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { IProduct } from '@interfaces/Product.interface';

@Component({

	selector: 'recommendeds-carousel',

	templateUrl: './recommendeds_carousel.component.html',

	styleUrls: ['./recommendeds_carousel.component.scss']

})

export class RecommendedsCarouselComponent {

	@Input() recommendeds: IProduct[] =[];

	constructor() { }

}	
