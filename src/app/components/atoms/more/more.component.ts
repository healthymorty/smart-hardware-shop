import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({

	selector: 'more',

	templateUrl: './more.component.html',

	styleUrls: ['./more.component.scss']

})

export class MoreComponent implements OnInit {

	@Input() vertical	= true;

	@Output() moreClicked: EventEmitter<void> = new EventEmitter<void>();

	constructor() { }

	ngOnInit(): void {}

	public onMoreClick(): void {

		this.moreClicked.emit();

	}

}
