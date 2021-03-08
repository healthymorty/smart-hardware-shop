import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({

	selector: 'progress-bar',

	templateUrl: './progress_bar.component.html',

	styleUrls: ['./progress_bar.component.scss']

})

export class ProgressBarComponent implements OnInit {

	@Input() value?:	number;

	constructor() { }

	ngOnInit(): void {}

}
