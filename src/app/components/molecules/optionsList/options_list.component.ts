import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { InputComponent } from '@atoms/inputComp';

@Component({

	selector: 'cc-options-list',

	templateUrl: './options_list.component.html',

	styleUrls: ['./options_list.component.scss']

})

export class OptionsListComponent { //implements OnInit {

	/*@Input() tags?: ITag[];

	@Input() user?:	IUser;

	@Output() tagSelected:	EventEmitter<ITag>	= new EventEmitter<ITag>();*/

	/*@ViewChild('searchInputComp') searchInputComp?: InputComponent;

	public notFoundLabel	= '<i class="icon fa fa-ban"></i>';

	public searchLabel		= '<i class="icon fa fa-search"></i>';

	public selectedTag?:	ITag;

	public showNotFound		= false;

	public tagsList:		ITag[] = [];

	public userId?:			number;*/

	constructor(

		private _cdRef: ChangeDetectorRef

	) { }

	/*ngOnInit(): void {

		this.tagsList	= (this.tags) ? [...this.tags] : [];

		if (this.user)

			this.userId	= this.user.id;
			
	}

	public deselectTags(): void {

		const tags	= (this.tags) ? [...this.tags] : [];
		
		for (let tag of tags) tag.selected	= false;

		this.tags	= [...tags];

		this._cdRef.detectChanges();

	}

	public filterTags(searchText = this.searchInputComp?.text?.toLowerCase()): void {

		const tags	= (this.tags) ? [...this.tags] : [];
		
		for (let tag of tags)

			tag.hideDisplay = !(tag.text != null && tag.text !== '' && tag.text.toLowerCase().includes((searchText as string)));

		this.tags = [...tags];

		this._cdRef.detectChanges();

	}

	public onSearch(): void {

		this.filterTags();

		this.showNotFound	= this.tags?.filter(tag => !tag.hideDisplay).length === 0;

	}

	public onSelected($event: ITag): void {

		this.deselectTags();

		this.selectedTag	= $event;

		this.selectedTag.selected	= true;

		this._cdRef.detectChanges();

		this.tagSelected.emit($event);

	}*/

}
