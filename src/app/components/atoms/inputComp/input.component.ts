import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { MaskService }	from '@services/Mask.service';

@Component({

	selector: 'input-comp',

	templateUrl: './input.component.html',

	styleUrls: ['./input.component.scss']

})

export class InputComponent implements OnInit {

	@Input() alignment		= 'start';

	@Input() autocomplete	= false;
	
	@Input() autofocus		= false;
	
	@Input() disabled		= false;

	@Input() icon?:			string;

	@Input() label?:		string;
	
	@Input() placeholder?:	string;

	private _text: string | number = '';
	
	get text(): string | number {

		return this._text;

	}
	
	@Input() set text(text: string | number)	{

		if (this._from === 'uiText') {

			this._from	= undefined;

			this._text	= (this._isDefaultText(text)) ? text : this._maskService.convertForApi(text, this.textType, 'percent');

		} else {

			this._from		= 'text';

			this.uiText		= text;

			this._text		= (this._isDefaultText(text)) ? text : this._maskService.convertForApi(text, this.textType)

		}

	}
	
	@Input() type?:			string = 'text';

	@Input() textType 		= 'text';

	@Input() timeType 		= 'hour';

	@Output() blurred:		EventEmitter<void> = new EventEmitter<void>();

	@Output() focused:		EventEmitter<void> = new EventEmitter<void>();
	
	@Output() typingHasStopped:	EventEmitter<void> = new EventEmitter<void>();

	private _from?: string;
	
	get isValid(): boolean {

		const inputElem	= this._element.nativeElement.querySelector('input');

		return (inputElem!.value !== '' && inputElem!.value.match(/^ *$/) === null);

	}

	private _typingStoppedTimer	= null;

	private _uiText!: string | number;

	get uiText(): string | number {

		return this._uiText;

	}

	set uiText(text: string | number) {

		if (this._from === 'text') {

			this._from		= undefined;

			this._uiText	= (this._isDefaultText(text)) ? text: this._maskService.convertForView(text, this.textType, 'decimal')

		} else {

			this._from		= 'uiText';

			this._uiText	= (this._isDefaultText(text)) ? text :  this._maskService.convertForView(text, this.textType);

			this.text		= text;
		}

	}

	constructor(

		private _element:		ElementRef,

		private _maskService:	MaskService

	) { }

	ngOnInit(): void {}

	public focus(): void {
		
		this._element.nativeElement.querySelector('input').focus();

	}

	private _isDefaultText(text?: string | number): boolean {

		return (text == null || text === '' || this.textType === 'text');

	}

	public keypressHandler($event: any): boolean {

		if (['number'].indexOf(this.textType) !== -1) {

			const text	= this.uiText;

			if ('0123456789.,$'.indexOf($event.key) === -1 || ($event.key === '.' && (text as string).split('.').length > 1)) return false;

		}

		return true;

	}

	public onBlur(): void {

		this.blurred.emit();

	}

	public onFocus(): void {

		this.focused.emit();

	}

	public onKeyup(): void {

		clearTimeout(this._typingStoppedTimer!);

		setTimeout(() => {

			this.typingHasStopped.emit();

		}, 1000);

	}

}
