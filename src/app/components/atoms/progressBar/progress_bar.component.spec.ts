import { ComponentFixture, TestBed }	from '@angular/core/testing';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { ProgressBarComponent }			from './progress_bar.component';

describe('ProgressBarComponent', () => {

	let component:	ProgressBarComponent;

	let fixture:	ComponentFixture<ProgressBarComponent>;

	beforeEach(async () => {

		await TestBed.configureTestingModule({

			declarations:	[ ProgressBarComponent ],
			
			schemas:		[ NO_ERRORS_SCHEMA ]

		})

		.compileComponents();

		fixture		= TestBed.createComponent(ProgressBarComponent);

		component	= fixture.componentInstance;

		fixture.detectChanges();

	});

	it('should create progress bar component', () => {

		expect(component).toBeTruthy();

	});

});