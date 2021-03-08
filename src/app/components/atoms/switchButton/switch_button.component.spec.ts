import { ComponentFixture, TestBed }	from '@angular/core/testing';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { SwitchButtonComponent }		from './switch_button.component';

describe('SwitchButtonComponent', () => {

	let component:	SwitchButtonComponent;

	let fixture:	ComponentFixture<SwitchButtonComponent>;

	beforeEach(async () => {

		await TestBed.configureTestingModule({

			declarations:	[ SwitchButtonComponent ],
			
			schemas:		[ NO_ERRORS_SCHEMA ]

		})

		.compileComponents();

		fixture		= TestBed.createComponent(SwitchButtonComponent);

		component	= fixture.componentInstance;

		fixture.detectChanges();

	});

	it('should create switch button', () => {

		expect(component).toBeTruthy();

	});

	describe('onClick', () => {

		it('should reset active property and broadcast that switch was clicked', () => {

			component.active	= false;

			jest.spyOn(component.clicked, 'emit');

			component.onClick();

			expect(component.active).toBeTruthy();

			expect(component.clicked.emit).toHaveBeenCalled();


		});

	});

});