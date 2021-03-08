import { ComponentFixture, TestBed }	from '@angular/core/testing';

import { ComponentType }				from '@angular/cdk/portal';

import { ElementRef, TemplateRef }		from '@angular/core';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { ISettings }					from '@interfaces/Settings.interface';

import { MockGenericClass }				from '@mocks/GenericClass';

import { ProductCardComponent }		from './product_card.component';

describe('ProductCardComponent', () => {
	
	let component:	ProductCardComponent;
	
	let fixture:	ComponentFixture<ProductCardComponent>;

	beforeEach(async () => {
	
		await TestBed.configureTestingModule({
	
			declarations:	[ ProductCardComponent ],

			providers:		[],
					
			schemas:		[ NO_ERRORS_SCHEMA ]
	
		})
	
		.compileComponents();
	
	});

	beforeEach(() => {
	
		fixture		= TestBed.createComponent(ProductCardComponent);
	
		component	= fixture.componentInstance;
	
		fixture.detectChanges();
	
	});

	it('should create', () => {
	
		expect(component).toBeTruthy();
	
	});

});