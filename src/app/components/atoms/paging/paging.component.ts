import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { URLManagerService } from '@services/URLManager.service';

@Component({

	selector: 'paging',

	templateUrl: './paging.component.html',

	styleUrls: ['./paging.component.scss']

})

export class PagingComponent {

	@Input() itemName?:		string;

	public _pageNum: number | undefined;

	get pageNum(): number | undefined {

		return this._pageNum;

	}

	@Input() set pageNum(pageNum: number | undefined) {

		this._pageNum	= pageNum;

		this.setPageSetNum();

		this.setRange();

		this._URLManagerService.updateURLFromParams({page: pageNum});

	}

	@Input() pageSize		= 24;

	@Input() totalItems?: 	number;

	public numberOfPages	= 0;

	public pageSetMap?:		{ [key: number]: any[] } = {};

	public pageSetNum?:		number;

	public pageSetSize		= 5;

	public range?:			string;

	constructor(

		private _URLManagerService: URLManagerService

	) { }

	ngOnInit() {

		this.setPageSetMap();

	}

	public onPage(pageNum: number): void {

		this.pageNum	= pageNum;

	}

	public setPageSetMap(): void {
		
		this.numberOfPages	= Math.ceil(Math.ceil(this.totalItems! / this.pageSize) / this.pageSetSize);

		const pageMap:	{ [key: number]: any[] } = {};

		for (let i = 1; i <= this.numberOfPages; i++) {

			if (!pageMap[i]) pageMap[i]	= [];
			
			const setLength	= (i * this.pageSetSize);

			for (let j = (setLength + 1) - this.pageSetSize; j <= setLength; j++)

				if (this.totalItems! <= j)

					pageMap[i].push(j);

		}

		this.pageSetMap	= pageMap;

	}

	public setPageSetNum(): void {

		const pageSetNum	= Math.ceil(this.pageNum! / this.pageSetSize);

		if (this.pageSetNum === undefined || this.pageSetNum !== pageSetNum)

			this.pageSetNum	= pageSetNum;

	}

	public setRange(): void {

		const pageCount	= this.pageNum! * this.pageSize;

		this.range		= (pageCount + 1 - this.pageSize) + ' - ' + pageCount;

	}

}	
