import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({

	selector: 'switch-button',

	templateUrl: './switch_button.component.html',

	styleUrls: ['./switch_button.component.scss']

})

export class SwitchButtonComponent implements OnInit {

	@Input() active	= false;

	@Output() clicked: EventEmitter<boolean> = new EventEmitter<boolean>(); 

	constructor() { }

	ngOnInit() {}

	public onClick(): void {

		this.active	= !this.active;

		this.clicked.emit(this.active);

	}

}	
