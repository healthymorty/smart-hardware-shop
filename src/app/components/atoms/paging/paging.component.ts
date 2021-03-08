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

		this.setURLPageNumber();

	}

	@Input() pageSize		= 24;

	@Input() totalItems?: 	number;

	@Output() page:	EventEmitter<number> = new EventEmitter<number>();

	public lastPageSetNum?:	number;	

	public numberOfPages	= 0;

	public pageSetMap?:		{ [key: number]: any[] };

	public pageSetNum?:		number;

	public pageSetSize		= 5;

	public range?:			string;

	constructor(

		private _URLManagerService: URLManagerService

	) { }

	ngOnInit() {
		
		if (this._pageNum === undefined)

			this.pageNum	= (this._URLManagerService.hasQueryParam('page')) ?

				+this._URLManagerService.getQueryParam('page') : 1;

		this.setPageSetMap();

	}

	public onJumpToBeginning(): void {

		this.setPageSetNum();

		this.pageNum	= this.pageSetMap![1][0];

		this.page.emit(this.pageNum);

	}

	public onJumpToEnd(): void {

		this.setPageSetNum();

		const pageSetLength	= Object.keys(this.pageSetMap!).length;

		this.pageNum		= this.pageSetMap![pageSetLength][4];

		this.page.emit(this.pageNum);

	}

	public onPage(pageNum: number): void {

		this.pageNum	= pageNum;

		this.page.emit(this.pageNum);

	}

	public onPageBackward(): void {

		this.setPageSetNum();

		this.pageNum	= this.pageNum! - 1;

		this.page.emit(this.pageNum);

	}

	public onPageForward(): void {

		this.setPageSetNum();

		this.pageNum	= this.pageNum! + 1;

		this.page.emit(this.pageNum);

	}

	public onPageSizeSelected(size: number): void {

		this.pageSize	= size;

		this.setPageSetNum();

	}

	public setPageSetMap(): void {
		
		this.numberOfPages	= Math.ceil(Math.ceil(this.totalItems! / this.pageSize) / this.pageSetSize);

		const pageMap:	{ [key: number]: any[] } = {};

		for (let i = 1; i <= this.numberOfPages; i++) {

			if (!pageMap[i]) pageMap[i]	= [];
			
			const setLength	= (i * this.pageSetSize);

			for (let j = (setLength + 1) - this.pageSetSize; j <= setLength; j++)

				if (j <= this.totalItems!) pageMap[i].push(j);

		}

		this.pageSetMap		= pageMap;

		this.lastPageSetNum	= Object.keys(pageMap).length;

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

	public setURLPageNumber(): void {
		
		if (!this._URLManagerService.hasQueryParam('page') || +this._URLManagerService.getQueryParam('page') !== this.pageNum)

			this._URLManagerService.updateURLFromParams({page: this.pageNum!.toString()});

	}

}	
