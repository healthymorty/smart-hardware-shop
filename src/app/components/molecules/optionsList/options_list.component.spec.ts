import { ComponentFixture, TestBed }	from '@angular/core/testing';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { OptionsListComponent }			from './options_list.component';

describe('OptionsListComponent', () => {

	let component: OptionsListComponent;

	let fixture: ComponentFixture<OptionsListComponent>;

	beforeEach(async () => {

		await TestBed.configureTestingModule({

			declarations:	[ OptionsListComponent ],
			
			schemas:		[ NO_ERRORS_SCHEMA ]

		})

		.compileComponents();

	});

	beforeEach(() => {

		fixture		= TestBed.createComponent(OptionsListComponent);

		component	= fixture.componentInstance;

		fixture.detectChanges();

	});

	it('should create', () => {

		expect(component).toBeTruthy();

	});

	describe('deselectTags', () => {

		it('should ', () => {


		});

	});

	describe('filterTags', () => {

		it('should ', () => {


		});

	});

	describe('onSearch', () => {

		it('should ', () => {


		});

	});

	describe('onSelected', () => {

		it('should ', () => {


		});

	});

});