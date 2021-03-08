import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NO_ERRORS_SCHEMA }			from '@angular/compiler/src/core';


import { MoreComponent } from './more.component';

describe('MoreComponent', () => {

	let component:	MoreComponent;

	let fixture:	ComponentFixture<MoreComponent>;

	beforeEach(async () => {

		await TestBed.configureTestingModule({

			declarations:	[ MoreComponent ],

			schemas:		[ NO_ERRORS_SCHEMA ]

		})

		.compileComponents();

		fixture		= TestBed.createComponent(MoreComponent);

		component	= fixture.componentInstance;

		fixture.detectChanges();

	});

	it('should create more component', () => {

		expect(component).toBeTruthy();

	});

	describe('onMoreClick', () => {

		it('should boradcast that the more element was clicked', () => {

			jest.spyOn(component.moreClicked, 'emit');

			component.onMoreClick();

			expect(component.moreClicked.emit).toBeTruthy();
			
		});

	});

});