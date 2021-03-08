import { ComponentFixture, fakeAsync, TestBed, tick }	from '@angular/core/testing';

import { of } 							from 'rxjs';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { EventsService }				from '@services/Events.service';

import { InputComponent }				from '@atoms/inputComp';

import { MockGenericClass }				from '@mocks/GenericClass';

import { RWInputComponent }				from './rw_input.component';

describe('RWInputComponent', () => {

	let component:	RWInputComponent;

	let fixture:	ComponentFixture<RWInputComponent>;

	const MockEventSevice	= new MockGenericClass();

	MockEventSevice.currentMessage 	= of({ isLoggedIn: true });

	MockEventSevice.currentMessage.subscribe	= jest.fn();

	beforeEach(async () => {

		await TestBed.configureTestingModule({

			declarations:	[ RWInputComponent ],

			providers:		[

				{

					provide:	EventsService,

					useValue:	MockEventSevice

				}

			],
			
			schemas:		[ NO_ERRORS_SCHEMA ]

		})

		.compileComponents();

		fixture		= TestBed.createComponent(RWInputComponent);

		component	= fixture.componentInstance;

		fixture.detectChanges();

	});

	it('should create rw input component', () => {

		expect(component).toBeTruthy();

	});

	describe('text', () => {

		it('should set text if text type is not time', () => {

			component.text	= 'test';

			expect(component.readText).toEqual('test');

		});

		it('should set text if text type is time', () => {

			component.textType	= 'time';

			component.text		= 7;

			expect(component.readText).toEqual('07');

		});

		it('should set text if text type is time and text undefined', () => {

			component.placeholder	= 'test';

			component.text	= undefined;

			expect(component.readText).toEqual('test');

		});

		it('should get text where there is not input comp', () => {

			component.readText	= 'test';

			expect(component.text).toEqual('test');

		});

	});

	describe('inputText', () => {

		it('should get text from input component', () => {

			component.inputComp	= new MockGenericClass() as InputComponent;
			
			Object.defineProperty(component.inputComp, 'text', {

				get: () => 'test'

			});

			expect(component.inputText).toEqual('test');

		});

	});

	describe('isValid', () => {

		it('should validate that text are valid', () => {

			component.inputComp = new MockGenericClass() as InputComponent;

			Object.defineProperty(component.inputComp, 'isValid', {

				get: () => true

			});

			component.readText	= 'test';

			expect(component.isValid).toBeTruthy();

		});

	});

	describe('editingComplete', () => {

		it('should set editing false when mouse is over the element', () => {

			component.editing	= true;

			component.mouseoverElem	= false;

			component.editingComplete();

			expect(component.editing).toBeFalsy();

		});

	});

	describe('onBlur', () => {

		it('should set read text when the input is blurred', () => {

			component.inputComp	= new MockGenericClass() as InputComponent;

			Object.defineProperty(component.inputComp, 'text', {

				get: () => '7'

			})

			component.textType	= 'time';

			component.onBlur();

			expect(component.readText).toEqual('07');


		});

	});

	describe('onClick', () => {

		it('should reset text and focus input on click', fakeAsync(() => {

			component.editing	= false;

			jest.spyOn(component, 'resetText');

			component.inputComp	= new MockGenericClass() as InputComponent;

			component.inputComp.focus	= jest.fn();

			component.onClick();

			tick(0);

			expect(component.editing).toBeTruthy();

			expect(component.resetText).toHaveBeenCalled();

			expect(component.inputComp.focus).toHaveBeenCalled();


		}));

	});

	describe('resetText', () => {

		it('should reset text property when text type time', () => {

			component.textType		= 'time';

			component.placeholder	= 'test';

			component.readText		= 'test';

			component.resetText();

			expect(component.text).toBe('test');

		});

	});

	describe('onTypingHasStopped', () => {

		it('should boradcast when user has stopped typing', () => {

			jest.spyOn(component.typingHasStopped, 'emit');

			component.onTypingHasStopped();

			expect(component.typingHasStopped.emit).toHaveBeenCalled();

		});

	});

	describe('onDownArrowClicked', () => {

		it('should broadcast when down arrow is clicked', () => {

			component.downArrowDisabled	= false;

			jest.spyOn(component.downArrowClicked, 'emit');

			component.onDownArrowClicked();

			expect(component.downArrowClicked.emit).toHaveBeenCalled();

		});

	});

	describe('onUpArrowClicked', () => {

		it('should broadcast when up arrow is clicked', () => {

			component.upArrowDisabled	= false;

			jest.spyOn(component.upArrowClicked, 'emit');

			component.onUpArrowClicked();

			expect(component.upArrowClicked.emit).toHaveBeenCalled();

		});

	});

});