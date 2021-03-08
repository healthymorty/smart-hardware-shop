import { Component, EventEmitter, HostListener, Inject, Input, Output, ViewChild }		from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA }	from '@angular/material/dialog';

import { CheckboxComponent }	from '@atoms/checkbox';

import { ISettings }			from '@interfaces/Settings.interface';

@Component({

	selector: 'settings-dialog',

	templateUrl: './settings_dialog.component.html',

	styleUrls: ['./settings_dialog.component.scss']

})

export class SettingsDialogComponent {

	@Input() hour	= '12';

	@Output() hourSelected: EventEmitter<void> = new EventEmitter<void>();

	@ViewChild('hour12CheckboxComp') hour12CheckboxComp?: CheckboxComponent;

	@ViewChild('hour24CheckboxComp') hour24CheckboxComp?: CheckboxComponent;

	public hour_12		= false;

	public hour_24		= false;

	public mouseover	= false;

	constructor(

		private _dialogRef:	MatDialogRef<SettingsDialogComponent>,
		
		@Inject(MAT_DIALOG_DATA) private _data: ISettings
		
	) {

		this.hour	= this._data.hour;

	}

	@HostListener('document:mousedown', ['$event']) onMousedown(event: MouseEvent) {

		if (!this.mouseover) this._dialogRef.close(this.hour);

	}

	ngOnInit() {

		this.hour_12	= this.hour === '12';

		this.hour_24	= this.hour === '24';

	}

	public onCheckboxClicked(hour: string): void {

		this.hour	= (hour === '12') ? '12' : '24';

		if (hour === '12')

			this.hour24CheckboxComp!.selected	= (this.hour12CheckboxComp!.selected) ? false : true;

		if (hour === '24')
			
			this.hour12CheckboxComp!.selected	= (this.hour24CheckboxComp!.selected) ? false : true;
		
		this.hourSelected.emit();

	}

}
