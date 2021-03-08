import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';

import { EventsService }	from '@services/Events.service';

import { InputComponent }	from '@atoms/inputComp';

@Component({

	selector: 'rw-input-comp',

	templateUrl: './rw_input.component.html',

	styleUrls: ['./rw_input.component.scss']

})

export class RWInputComponent implements OnInit {

	@Input() alignment 		= 'start';

	@Input() autocomplete	= false;
	
	@Input() autofocus		= false;
	
	@Input() disabled		= false;

	@Input() hourClock		= '12';	

	@Input() icon?:			string;

	@Input() label?:		string;
	
	@Input() placeholder?:	string;

	@Input() showArrows		= false;

	private _text:	string | number | undefined;
	
	get text(): string | number | undefined {

		return (this.inputComp!) ? this.inputComp!.text : this.readText;

	}

	@Input() set text(text: string | number | undefined) {

		text	= (this.textType !== 'time') ? text : 
		
			(text !== undefined && text!.toString().length === 1) ? '0' + text : text;

		this._text		= text;

		this.readText	= (text === undefined || text === '') ? this.placeholder : text;

	}

	@Input() textType?:		string = 'text';

	@Input() timeType		= 'hour';
	
	@Input() type?:			string = 'text';

	@Output() editingStateChange:	EventEmitter<boolean> = new EventEmitter<boolean>();

	@Output() downArrowClicked:		EventEmitter<void> = new EventEmitter<void>();

	@Output() typingHasStopped:		EventEmitter<void> = new EventEmitter<void>();

	@Output() upArrowClicked:		EventEmitter<void> = new EventEmitter<void>();

	@ViewChild('inputComp') inputComp!: InputComponent;

	public downArrowDisabled	= false;

	public editing				= false;

	public upArrowDisabled		= false;

	get inputText(): string | number | undefined {

		return (this.inputComp) ? this.inputComp.text : undefined;

	}

	get isValid(): boolean {

		return this.inputComp && this.inputComp!.isValid || this.readText !== this.placeholder;

	}

	public mouseoverElem	= false;

	public readText?: string | number | undefined;

	constructor(

		private _eventsService: EventsService

	) { 

		this._eventsService.currentMessage.subscribe(data => {

			if (data.message === 'document:event:mouseup')

				this.editingComplete();

		});

	}

	ngOnInit(): void {

		this.readText	= (this.text === undefined || this.text === '') ? this.placeholder : this.text;

	}

	public editingComplete(): void {

		if (!this.mouseoverElem) this.editing = false;

	}

	public onBlur(): void {

		const inputText	= (this.inputComp! !== undefined && this.inputComp!.text !== undefined) ? 
		
			this.inputComp!.text.toString() : '';

		this.readText	= (inputText === '') ? this.placeholder : 
		
			(this.textType === 'time') ? 
			
				((inputText.length === 1) ? '0' + inputText : inputText) 
				
				: inputText;
	
	}

	public onClick(): void {

		if (!this.editing) {

			this.editing	= true;

			this.resetText();

			setTimeout(() => {

				if (this.inputComp) this.inputComp.focus();

			}, 0);

		}

	}

	public resetText(): void {

		this.text	= ((this.textType === 'time' && this._text === undefined && this.placeholder === this.readText)
		
					|| (this.textType !== 'time' && this.placeholder === this.readText)) ? 
		
			undefined : this.readText;

	}

	public onTypingHasStopped(): void {

		this.typingHasStopped.emit();

	}

	public onDownArrowClicked(): void {

		if (!this.downArrowDisabled)

			this.downArrowClicked.emit();

	}

	public onUpArrowClicked(): void {

		if (!this.upArrowDisabled)

			this.upArrowClicked.emit();

	}

}
