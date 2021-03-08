import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({

	selector: 'checkbox',

	templateUrl: './checkbox.component.html',

	styleUrls: ['./checkbox.component.scss']

})

export class CheckboxComponent implements OnInit {

	@Input() selected	= false;

	@Input() label?: 	string;

	@Output() checkboxClicked:	EventEmitter<boolean> = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit(): void {}

	public onClick(): void {
		
		this.selected	= !this.selected;

		this.checkboxClicked.emit(this.selected);

	}

}	
