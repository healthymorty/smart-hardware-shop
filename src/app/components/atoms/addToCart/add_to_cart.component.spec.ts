import { ComponentFixture, TestBed }	from '@angular/core/testing';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { AddToCartComponent }			from './add_to_cart.component';

describe('AddToCartComponent', () => {
	
	let component:	AddToCartComponent;
	
	let fixture:	ComponentFixture<AddToCartComponent>;

	beforeEach(async () => {
	
		await TestBed.configureTestingModule({
	
			declarations:	[ AddToCartComponent ],
			
			schemas:		[ NO_ERRORS_SCHEMA ]
			
		})
	
		.compileComponents();
	
	});

	beforeEach(() => {
		
		fixture		= TestBed.createComponent(AddToCartComponent);
		
		component	= fixture.componentInstance;
		
		fixture.detectChanges();
	
	});

	it('should create', () => {
	
		expect(component).toBeTruthy();
	
	});

});