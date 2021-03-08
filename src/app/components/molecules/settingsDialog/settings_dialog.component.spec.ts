import { ComponentFixture, TestBed }	from '@angular/core/testing';

import { ComponentType }				from '@angular/cdk/portal';

import { ElementRef, TemplateRef }		from '@angular/core';

import { NO_ERRORS_SCHEMA }				from '@angular/compiler/src/core';

import { ISettings }					from '@interfaces/Settings.interface';

import {

	MatDialog,

	MatDialogConfig,

	MatDialogRef,

	MAT_DIALOG_DATA

}	from '@angular/material/dialog';

import { MockGenericClass }				from '@mocks/GenericClass';

import { SettingsDialogComponent }		from './settings_dialog.component';

describe('SettingsDialogComponent', () => {
	
	let component:	SettingsDialogComponent;
	
	let fixture:	ComponentFixture<SettingsDialogComponent>;

	const MockMatDialog	= {

		open: (componentOrTemplateRef: ComponentType<any> | TemplateRef<any>, config?: MatDialogConfig<any>) => {

			return {

				afterClosed: () => {

					return { subscribe: jest.fn() };

				}

			};

		},

		close: jest.fn()

	};

	const MockMatDialogRef	= new MockGenericClass();

	beforeEach(async () => {
	
		await TestBed.configureTestingModule({
	
			declarations:	[ SettingsDialogComponent ],

			providers:		[

				{

					provide: MatDialogRef,

					useValue: MockMatDialogRef

				},

				{

					provide: MAT_DIALOG_DATA,

					useValue: new MockGenericClass()

				}

			],
					
			schemas:		[ NO_ERRORS_SCHEMA ]
	
		})
	
		.compileComponents();
	
	});

	beforeEach(() => {
	
		fixture		= TestBed.createComponent(SettingsDialogComponent);
	
		component	= fixture.componentInstance;
	
		fixture.detectChanges();
	
	});

	it('should create', () => {
	
		expect(component).toBeTruthy();
	
	});

	describe('onCheckboxClicked', () => {

		it('should ', () => {


		});

	});

});