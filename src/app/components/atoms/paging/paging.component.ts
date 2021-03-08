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

	@Input() pageSize	= 24;

	public _totalItems?:	number; 

	get totalItems(): number {

		return this._totalItems!;

	}
	
	@Input() set totalItems(totalItems: number) {

		this._totalItems	= totalItems;

		if (totalItems != null && this.initiated)	this.setPageSetMap();

	};

	@Output() page:	EventEmitter<number> = new EventEmitter<number>();

	public initiated		= false;

	public lastPageSetNum?:	number;	

	public numberOfPageSets	= 0;

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

		this.initiated	= true;

	}

	public onJumpToBeginning(): void {

		this.setPageSetNum();

		this.pageNum	= this.pageSetMap![1][0];

		this.page.emit(this.pageNum);

	}

	public onJumpToEnd(): void {

		this.setPageSetNum();

		this.pageNum		= this.pageSetMap![this.numberOfPageSets][this.pageSetMap![this.numberOfPageSets].length - 1];

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
		
		const numberOfPages		= Math.ceil(this.totalItems! / this.pageSize);

		this.numberOfPageSets	= Math.ceil(numberOfPages / this.pageSetSize);

		const pageMap:	{ [key: number]: any[] } = {};

		for (let i = 1; i <= this.numberOfPageSets; i++) {

			if (!pageMap[i]) pageMap[i]	= [];
			
			const setLength	= (i * this.pageSetSize);

			for (let j = (setLength + 1) - this.pageSetSize; j <= setLength; j++)

				if (j <= numberOfPages) pageMap[i].push(j);

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
