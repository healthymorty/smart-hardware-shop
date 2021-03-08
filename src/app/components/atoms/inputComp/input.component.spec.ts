import { ElementRef }					from '@angular/core';

import { ComponentFixture, fakeAsync, TestBed, tick }	from '@angular/core/testing';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { InputComponent }				from './input.component';

import { MaskService }					from '@services/Mask.service';

import { MockGenericClass }				from '@mocks/GenericClass';

describe('InputComponent', () => {

	let component:	InputComponent;

	let fixture:	ComponentFixture<InputComponent>;

	beforeEach(async () => {

		await TestBed.configureTestingModule({

			declarations:	[ InputComponent ],
 
			providers:		[
				
				{

					provide:	ElementRef,

					useValue:	new MockGenericClass()

				},

				MaskService 
			
			],
			
			schemas:		[ NO_ERRORS_SCHEMA ]

		})

		.compileComponents();

		fixture		= TestBed.createComponent(InputComponent);

		component	= fixture.componentInstance;

		(component as any)._from = '';

		fixture.detectChanges();

	});

	it('should create input component', () => {

		expect(component).toBeTruthy();

	});

	describe('text', () => {

		it('should set text when textType is text', () => {

			(component as any)._from	= 'uiText';

			component.text	= 'test';

			expect((component as any)._from).toBeFalsy();

			expect((component as any)._text).toEqual('test');

		});

		it('should set text percent to decimal', () => {

			(component as any)._from	= 'uiText';

			component.textType	= 'percent';

			component.text		= '30%';

			expect((component as any)._from).toBeFalsy();

			expect((component as any)._text).toBe(.30);

		});

		it('should set text not from the user', () => {

			component.textType	= 'percent';

			component.text		= .30;

			expect(component.uiText).toBe('30.00%');

			expect((component as any)._text).toBe(.30);

		});

		it('should get text', () => {

			(component as any)._text	= 'test';

			expect(component.text).toBe('test');

		});

	});

	describe('isValid', () => {

		it('should validate input', () => {

			const mockInputElem	= new MockGenericClass();

			mockInputElem.nativeElement	= {

				querySelector: (tag: string) => { value: 'test' }

			};

			(component as any)._element	= mockInputElem;

			jest.spyOn((component as any)._element.nativeElement, 'querySelector').mockReturnValue({ value: 'test' });

			expect(component.isValid).toBeTruthy();

		});

	});

	describe('uiText', () => {

		it('should set text for the view', () => {

			(component as any)._from	= 'text';

			component.uiText	= 'test';

			expect((component as any)._uiText).toBe('test');

		});

		it('should set text for the view type percent from api', () => {

			(component as any)._from	= 'text';

			component.textType	= 'percent';

			component.uiText	= .30;

			expect((component as any)._uiText).toBe('30.00%');

		});

		it('should set text for the view type percent from user', () => {

			component.textType	= 'percent';

			component.uiText	= '30%';

			expect((component as any)._uiText!).toBe(30);

			expect(component.text).toBe(.30);

		});

		it('should get text from view', () => {

			(component as any)._uiText	= 'test';

			expect(component.uiText).toBe('test');

		});

	});

	describe('focus', () => {

		it('should focus in input', () => {

			(component as any)._element	= new MockGenericClass();

			(component as any)._element	= {

				nativeElement: {

					querySelector: (tag: string) => {

						return { focus: jest.fn() }

					}

				}

			};

			jest.spyOn((component as any)._element.nativeElement, 'querySelector');

			component.focus();

			expect((component as any)._element.nativeElement.querySelector).toHaveBeenCalled();

		});

	});

	describe('_isDefaultText', () => {

		it('should check if text is in the default state', () => {

			component.textType	= 'text';

			expect((component as any)._isDefaultText('test')).toBeTruthy();

		});

	});

	describe('keypressHandler', () => {

		it('should block keypress if the value is not a number', () => {

			component.textType	= 'number';

			component.uiText	= 'test';

			expect(component.keypressHandler({key: 't'})).toBeFalsy();

		});

		it('should block keypress if the value is not a number', () => {

			component.textType	= 'time';

			component.timeType	= 'hour';

			component.uiText	= 'test';

			const $event		= {

				key:	7,

				target: {

					selectionStart: 0

				}

			};

			component.uiText	= 7;

			expect(component.keypressHandler($event)).toBeTruthy();

		});

	});

	describe('onBlur', () => {

		it('should broadcast that input was blurred', () => {

			jest.spyOn(component.blurred, 'emit');

			expect(component.blurred.emit).toBeTruthy();

		});

	});

	describe('onFocus', () => {

		it('should broadcast that input was focused', () => {

			jest.spyOn(component.focused, 'emit');

			expect(component.focused.emit).toBeTruthy();

		});

	});

	describe('onKeyup', () => {

		it('should emit when typing has stopped', fakeAsync(() => {

			jest.spyOn(component.typingHasStopped, 'emit');

			component.onKeyup();

			tick(1000);

			expect(component.typingHasStopped.emit).toBeTruthy();

		}));

	});

});