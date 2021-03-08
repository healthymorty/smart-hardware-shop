import { ComponentFixture, TestBed }	from '@angular/core/testing';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { CheckboxComponent }			from './checkbox.component';

describe('CheckboxComponent', () => {
	
	let component:	CheckboxComponent;
	
	let fixture:	ComponentFixture<CheckboxComponent>;

	beforeEach(async () => {
	
		await TestBed.configureTestingModule({
	
			declarations:	[ CheckboxComponent ],
			
			schemas:		[ NO_ERRORS_SCHEMA ]
			
		})
	
		.compileComponents();
	
	});

	beforeEach(() => {
		
		fixture		= TestBed.createComponent(CheckboxComponent);
		
		component	= fixture.componentInstance;
		
		fixture.detectChanges();
	
	});

	it('should create', () => {
	
		expect(component).toBeTruthy();
	
	});

	describe('onClick', () => {

		it('should update the checkbox selection', () => {
			
			component.selected	= false;

			jest.spyOn(component.checkboxClicked, 'emit');

			component.onClick();

			expect(component.selected).toBeTruthy();
					
		});

	});

});