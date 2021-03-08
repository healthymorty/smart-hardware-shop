import { ComponentFixture, TestBed }	from '@angular/core/testing';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { RecommendedsCarouselComponent }			from './recommendeds_carousel.component';

describe('RecommendedsCarouselComponent', () => {
	
	let component:	RecommendedsCarouselComponent;
	
	let fixture:	ComponentFixture<RecommendedsCarouselComponent>;

	beforeEach(async () => {
	
		await TestBed.configureTestingModule({
	
			declarations:	[ RecommendedsCarouselComponent ],
			
			schemas:		[ NO_ERRORS_SCHEMA ]
			
		})
	
		.compileComponents();
	
	});

	beforeEach(() => {
		
		fixture		= TestBed.createComponent(RecommendedsCarouselComponent);
		
		component	= fixture.componentInstance;
		
		fixture.detectChanges();
	
	});

	it('should create', () => {
	
		expect(component).toBeTruthy();
	
	});

});