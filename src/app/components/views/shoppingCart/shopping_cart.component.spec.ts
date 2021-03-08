import { ComponentFixture, TestBed }	from '@angular/core/testing';

import { ComponentType }				from '@angular/cdk/portal';

import { ElementRef, TemplateRef }		from '@angular/core';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { ISettings }					from '@interfaces/Settings.interface';

import { MockGenericClass }				from '@mocks/GenericClass';

import { ShoppingCartComponent }		from './shopping_cart.component';

describe('ShoppingCartComponent', () => {
	
	let component:	ShoppingCartComponent;
	
	let fixture:	ComponentFixture<ShoppingCartComponent>;

	beforeEach(async () => {
	
		await TestBed.configureTestingModule({
	
			declarations:	[ ShoppingCartComponent ],

			providers:		[],
					
			schemas:		[ NO_ERRORS_SCHEMA ]
	
		})
	
		.compileComponents();
	
	});

	beforeEach(() => {
	
		fixture		= TestBed.createComponent(ShoppingCartComponent);
	
		component	= fixture.componentInstance;
	
		fixture.detectChanges();
	
	});

	it('should create', () => {
	
		expect(component).toBeTruthy();
	
	});

});