import { ComponentFixture, TestBed }	from '@angular/core/testing';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { ProductListItemComponent }			from './product_list_item.component';

describe('ProductListItemComponent', () => {
	
	let component:	ProductListItemComponent;
	
	let fixture:	ComponentFixture<ProductListItemComponent>;

	beforeEach(async () => {
	
		await TestBed.configureTestingModule({
	
			declarations:	[ ProductListItemComponent ],
			
			schemas:		[ NO_ERRORS_SCHEMA ]
			
		})
	
		.compileComponents();
	
	});

	beforeEach(() => {
		
		fixture		= TestBed.createComponent(ProductListItemComponent);
		
		component	= fixture.componentInstance;
		
		fixture.detectChanges();
	
	});

	it('should create', () => {
	
		expect(component).toBeTruthy();
	
	});

});