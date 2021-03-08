import { ComponentFixture, TestBed }	from '@angular/core/testing';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { AddeToCartComponent }			from './add_to_cart.component';

describe('AddeToCartComponent', () => {
	
	let component:	AddeToCartComponent;
	
	let fixture:	ComponentFixture<AddeToCartComponent>;

	beforeEach(async () => {
	
		await TestBed.configureTestingModule({
	
			declarations:	[ AddeToCartComponent ],
			
			schemas:		[ NO_ERRORS_SCHEMA ]
			
		})
	
		.compileComponents();
	
	});

	beforeEach(() => {
		
		fixture		= TestBed.createComponent(AddeToCartComponent);
		
		component	= fixture.componentInstance;
		
		fixture.detectChanges();
	
	});

	it('should create', () => {
	
		expect(component).toBeTruthy();
	
	});

});